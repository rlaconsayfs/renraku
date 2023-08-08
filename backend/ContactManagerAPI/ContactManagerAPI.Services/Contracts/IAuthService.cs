using ContactManagerAPI.Entities.Dtos.UserDtos;
using System.Security.Claims;

namespace ContactManagerAPI.Services.Contracts
{
    public interface IAuthService
    {
        /// <summary>
        /// Registers a new user
        /// </summary>
        /// <param name="userCreate"></param>
        /// <returns>The newly registered user</returns>
        Task<UserDto> RegisterUser(UserCreateDto userCreate);

        /// <summary>
        /// Logs in a user
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns>The JWT token if login is successful</returns>
        Task<string?> Login(UserLoginDto userLogin);

        /// <summary>
        /// Gets the current logged in user from the claims
        /// </summary>
        /// <param name="identity"></param>
        /// <returns>The User object</returns>
        UserDto? GetCurrentUser(ClaimsIdentity identity);
    }
}
