using ContactManagerAPI.Entities.Dtos.UserDtos;

namespace ContactManagerAPI.Services.Contracts
{
    public interface IUserService
    {
        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>An IEnumerable of UserDto</returns>
        Task<IEnumerable<UserDto>> GetUsersAsync();

        /// <summary>
        /// Gets a user by <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>A UserDto</returns>
        Task<UserDto?> GetUserAsync(Guid userId);

        /// <summary>
        /// Gets a user by <paramref name="username"/>
        /// </summary>
        /// <param name="username"></param>
        /// <returns>A UserDto</returns>
        Task<UserDto?> GetUserAsync(string username);

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="userCreate"></param>
        /// <returns>The newly created User in UserDto</returns>
        Task<UserDto> CreateUserAsync(UserCreateDto userCreate);

        /// <summary>
        /// Updates a <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userUpdate"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        Task<bool> UpdateUserAsync(Guid userId, UserUpdateDto userUpdate);

        /// <summary>
        /// Deletes a <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if delete is successful, false otherwise</returns>
        Task<bool> DeleteUserAsync(Guid userId);

        /// <summary>
        /// Checks if a user exists by <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if user exists, false otherwise</returns>
        Task<bool> DoesUserExist(Guid userId);

        /// <summary>
        /// Checks if a <paramref name="username"/> exists
        /// </summary>
        /// <param name="username"></param>
        /// <returns>True if username exists, false otherwise</returns>
        Task<bool> DoesUsernameExist(string username);
    }
}
