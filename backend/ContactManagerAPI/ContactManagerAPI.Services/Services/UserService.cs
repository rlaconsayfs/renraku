using AutoMapper;
using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Entities.Models;
using ContactManagerAPI.Repositories.Contracts;
using ContactManagerAPI.Services.Contracts;
using ContactManagerAPI.Utils;

namespace ContactManagerAPI.Services.Services
{
    public class UserService : IUserService
    {
        #region Fields
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        #endregion

        #region Constructor
        public UserService(
            IUserRepository userRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            var users = await _userRepository.GetUsersAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetUserAsync(Guid userId)
        {
            var user = await _userRepository.GetUserAsync(userId);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto?> GetUserAsync(string username)
        {
            var user = await _userRepository.GetUserAsync(username);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateUserAsync(UserCreateDto userCreate)
        {
            var user = _mapper.Map<User>(userCreate);
            var createdUser = await _userRepository.CreateUserAsync(user);

            return _mapper.Map<UserDto>(createdUser);
        }

        public async Task<bool> UpdateUserAsync(Guid userId, UserUpdateDto userUpdate)
        {
            var user = _mapper.Map<User>(userUpdate);
            user.Id = userId;
            user.PasswordHash = PasswordManager.HashPassword(userUpdate.Password);

            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            var user = await _userRepository.GetUserAsync(userId);

            return _userRepository.DeleteUser(user!);
        }

        public async Task<bool> DoesUserExist(Guid userId)
        {
            return await _userRepository.DoesUserExist(userId);
        }

        public async Task<bool> DoesUsernameExist(string username)
        {
            return await _userRepository.DoesUsernameExist(username);
        }
        #endregion
    }
}
