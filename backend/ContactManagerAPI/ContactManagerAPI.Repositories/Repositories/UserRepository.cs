using ContactManagerAPI.Entities.Models;
using ContactManagerAPI.Repositories.Context;
using ContactManagerAPI.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ContactManagerAPI.Repositories.Repositories
{
    public class UserRepository : IUserRepository
    {
        #region Fields
        private readonly ContactContext _context;
        #endregion

        #region Constructor
        public UserRepository(ContactContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserAsync(Guid userId)
        {
            return await _context.Users.Include(user => user.Contacts).ThenInclude(contact => contact.PhoneNumbers).FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<User?> GetUserAsync(string username)
        {
            return await _context.Users.Include(user => user.Contacts).ThenInclude(contact => contact.PhoneNumbers).FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            if(userToUpdate is null) return false;

            userToUpdate.Username = user.Username;
            userToUpdate.PasswordHash = user.PasswordHash;
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            userToUpdate.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return true;
        }

        public bool DeleteUser(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();

            return true;
        }

        public async Task<bool> DoesUserExist(Guid userId)
        {
            return await _context.Users.AnyAsync(u => u.Id == userId);
        }

        public async Task<bool> DoesUsernameExist(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }
        #endregion
    }
}
