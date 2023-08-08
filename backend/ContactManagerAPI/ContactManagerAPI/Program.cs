using ContactManagerAPI.Repositories.Context;
using ContactManagerAPI.Repositories.Contracts;
using ContactManagerAPI.Repositories.Repositories;
using ContactManagerAPI.Services.Contracts;
using ContactManagerAPI.Services.Services;
using ContactManagerAPI.Utils.Mappings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

namespace ContactManagerAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // Register Controllers
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                    options.JsonSerializerOptions.WriteIndented = true;
                })
                .AddNewtonsoftJson();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                // Create a Security Scheme for JWT Authentication
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "JWT Authentication",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",
                    Reference = new OpenApiReference
                    {
                        Id = "oauth2", // "oauth2" is strict in order for swagger to work correctly
                        Type = ReferenceType.SecurityScheme
                    }
                };

                // Add Security Definition to swagger
                options.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

                // Add Security Requirement to swagger
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { jwtSecurityScheme, Array.Empty<string>() }
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();

                // Add documentation for API
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Contact Manager API",
                    Description = "This is a simple API for managing contacts with authentication.",
                    Contact = new OpenApiContact
                    {
                        Name = "Raphael Laconsay",
                        Email = "rlaconsay@fullscale.io",
                        Url = new Uri("https://github.com/rlaconsayfs")
                    }
                });

                // Add documentation for XML comments to Swagger
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
            });

            // Register database context
            builder.Services.AddDbContext<ContactContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
            });

            // Register Authorization
            builder.Services.AddAuthorization(options =>
            {
                options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme).Build();

            });

            // Register Authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Token:Issuer"],
                        ValidAudience = builder.Configuration["Token:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"]))
                    };
                });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            // Register custom services
            ConfigureServices(builder.Services);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();


            void ConfigureServices(IServiceCollection services)
            {
                // Register automapper
                services.AddAutoMapper(
                    typeof(UserProfile),
                    typeof(ContactProfile),
                    typeof(PhoneNumberProfile));

                // Register repositories
                services.AddScoped<IUserRepository, UserRepository>();
                services.AddScoped<IContactRepository, ContactRepository>();

                // Register services
                services.AddScoped<IAuthService, AuthService>();
                services.AddScoped<ITokenService, TokenService>();
                services.AddScoped<IUserService, UserService>();
                services.AddScoped<IContactService, ContactService>();
            }
        }
    }
}