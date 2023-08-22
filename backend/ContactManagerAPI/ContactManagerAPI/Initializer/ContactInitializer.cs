using ContactManagerAPI.Entities.Models;
using ContactManagerAPI.Repositories.Context;
using ContactManagerAPI.Utils;

namespace ContactManagerAPI.Initializer
{
    public static class ContactInitializer
    {
        public static WebApplication Seed(this WebApplication app)
        {
           using (var scope = app.Services.CreateScope())
            {
                using var context = scope.ServiceProvider.GetRequiredService<ContactContext>();
                try
                {
                    context.Database.EnsureCreated();
                    var users = context.Users.FirstOrDefault();
                    if (users is null)
                    {
                        context.Users.Add(new User
                        {
                            Username = "admin",
                            PasswordHash = PasswordManager.HashPassword("admin"),
                            Email = "admin@renraku.com",
                            FirstName = "Admin",
                            LastName = "Admin",
                        });

                        context.SaveChanges();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return app;
            }
        }
    }
}
