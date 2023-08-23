using AutoMapper;
using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Services.Contracts;
using ContactManagerAPI.Utils;
using System.Security.Claims;
using System.Security.Principal;

namespace ContactManagerAPI.Services.Services
{
    public class AuthService : IAuthService
    {
        #region Fields
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        #endregion

        #region Constructor
        public AuthService(
            IUserService userService,
            ITokenService tokenService,
            IMapper mapper)
        {
            _userService = userService;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        #endregion

        #region Methods
        public async Task<UserDto> RegisterUser(UserCreateDto userCreate)
        {
            userCreate.Password = PasswordManager.HashPassword(userCreate.Password);
            var createdUser = await _userService.CreateUserAsync(userCreate);

            return _mapper.Map<UserDto>(createdUser);
        }

        public async Task<string?> Login(UserLoginDto userLogin)
        {
            var user = await _userService.GetUserAsync(userLogin.Username);
            if (user == null) return null;
            if (!PasswordManager.VerifyPassword(userLogin.Password, user.PasswordHash)) return null;

            var userDto = _mapper.Map<UserDto>(user);

            return _tokenService.CreateToken(userDto);
        }

        public UserDto? GetCurrentUser(ClaimsIdentity identity)
        {
            if (identity == null) return null;

            return new UserDto
            {
                Id = Guid.Parse(identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value!),
                Username = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value!,
                Email = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!,
                FirstName = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value!,
                LastName = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value!,
            };
        }
        #endregion
    }
}
