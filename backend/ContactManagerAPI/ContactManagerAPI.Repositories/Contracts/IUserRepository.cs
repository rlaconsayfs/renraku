using ContactManagerAPI.Entities.Models;

namespace ContactManagerAPI.Repositories.Contracts
{
    public interface IUserRepository
    {
        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>An IEnumerable of User</returns>
        Task<IEnumerable<User>> GetUsersAsync();

        /// <summary>
        /// Gets a user by <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>A User</returns>
        Task<User?> GetUserAsync(Guid userId);

        /// <summary>
        /// Get a user by <paramref name="username"/>
        /// </summary>
        /// <param name="username"></param>
        /// <returns>A User</returns>
        Task<User?> GetUserAsync(string username);

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="user"></param>
        /// <returns>The newly created user</returns>
        Task<User> CreateUserAsync(User user);

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="user"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        Task<bool> UpdateUserAsync(User user);

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="user"></param>
        /// <returns>True if deletion is successful, false otherwise</returns>
        bool DeleteUser(User user);

        /// <summary>
        /// Checks if a user exists
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if User exists, false otherwise</returns>
        Task<bool> DoesUserExist(Guid userId);

        /// <summary>
        /// Checks if a <paramref name="username"/> exists
        /// </summary>
        /// <param name="username"></param>
        /// <returns>True if username exists, false otherwise</returns>
        Task<bool> DoesUsernameExist(string username);
    }
}
