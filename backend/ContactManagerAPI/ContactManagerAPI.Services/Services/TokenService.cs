using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Services.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ContactManagerAPI.Services.Services
{
    public class TokenService : ITokenService
    {
        #region Fields
        private readonly IConfiguration _configuration;
        private readonly SymmetricSecurityKey _key;
        #endregion

        #region Constructor
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
        }
        #endregion

        #region Methods
        public string CreateToken(UserDto userDto)
        {
            var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, userDto.Id.ToString()),
                new Claim(ClaimTypes.Name, userDto.Username),
                new Claim(ClaimTypes.Email, userDto.Email),
                new Claim(ClaimTypes.GivenName, userDto.FirstName),
                new Claim(ClaimTypes.Surname, userDto.LastName),
                new Claim("FullName", userDto.FullName)
            };

            var token = new JwtSecurityToken(
                _configuration["Token:Issuer"],
                _configuration["Token:Audience"],
                claims,
                expires: DateTime.Now.AddHours(6),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion
    }
}
