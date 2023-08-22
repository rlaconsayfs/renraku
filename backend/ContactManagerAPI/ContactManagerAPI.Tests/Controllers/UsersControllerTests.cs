using ContactManagerAPI.Controllers;
using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Entities.Models;
using ContactManagerAPI.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Security.Claims;

namespace ContactManagerAPI.Tests.Controllers
{
    public class UsersControllerTests
    {
        #region Fields
        private readonly UsersController _usersController;
        private readonly Mock<IUserService> _userServiceMock;
        private readonly Mock<IAuthService> _authServiceMock;
        private readonly Mock<ILogger<UsersController>> _loggerMock;
        private readonly Guid _userId;
        private readonly UserDto _currentUser;
        private readonly UserDto _userDto;
        #endregion

        #region Constructor
        public UsersControllerTests()
        {
            _userServiceMock = new Mock<IUserService>();
            _authServiceMock = new Mock<IAuthService>();
            _loggerMock = new Mock<ILogger<UsersController>>();
            _usersController = new UsersController(
                _userServiceMock.Object,
                _authServiceMock.Object,
                _loggerMock.Object);

            _userId = new Guid();
            _currentUser = new UserDto { Id = _userId };
            _userDto = new UserDto();

            // Mock the HttpContext to provide a ClaimsIdentity
            var claimsIdentity = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, _userId.ToString()) });
            var httpContext = new DefaultHttpContext();
            httpContext.User = new ClaimsPrincipal(claimsIdentity);
            _usersController.ControllerContext = new ControllerContext { HttpContext = httpContext };
        }
        #endregion

        #region Tests
        [Fact]
        public async void GetUsers_HasUsers_Returns200()
        {
            // Arrange
            _userServiceMock.Setup(x => x.GetUsersAsync())
                .ReturnsAsync(new List<UserDto>() { new UserDto() });

            // Act
            var result = await _usersController.GetUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserDto>>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async void GetUsers_NoUsers_Returns204()
        {
            // Arrange
            _userServiceMock.Setup(x => x.GetUsersAsync())
                .ReturnsAsync(new List<UserDto>());

            // Act
            var result = await _usersController.GetUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserDto>>>(result);
            var noContentResult = Assert.IsType<NoContentResult>(actionResult.Result);
            Assert.Equal(204, noContentResult.StatusCode);
        }

        [Fact]
        public async void GetUsers_ThrowsException_Returns500()
        {
            // Arrange
            _userServiceMock.Setup(x => x.GetUsersAsync())
                .ThrowsAsync(new Exception());

            // Act
            var result = await _usersController.GetUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<UserDto>>>(result);
            var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public async void GetUser_UserExists_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.GetUserAsync(_userId))
                .ReturnsAsync(_userDto);

            // Act
            var result = await _usersController.GetUser(_userId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async void GetUser_Forbidden_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);

            // Act
            var result = await _usersController.GetUser(Guid.NewGuid());

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var forbiddenResult = Assert.IsType<ForbidResult>(actionResult.Result);
        }

        [Fact]
        public async void GetUser_UserDoesNotExist_Returns404()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.GetUserAsync(_userId))
                .ReturnsAsync((UserDto)null!);

            // Act
            var result = await _usersController.GetUser(_userId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var notFoundResult = Assert.IsType<NotFoundResult>(actionResult.Result);
            Assert.Equal(404, notFoundResult.StatusCode);
        }

        [Fact]
        public async void GetUser_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.GetUserAsync(_userId))
                .ThrowsAsync(new Exception());

            // Act
            var result = await _usersController.GetUser(_userId);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public void GetCurrentUser_UserExists_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);

            // Act
            var result = _usersController.GetCurrentUser();

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public void GetCurrentUser_UserDoesNotExist_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = _usersController.GetCurrentUser();

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var notFoundResult = Assert.IsType<ForbidResult>(actionResult.Result);
        }

        [Fact]
        public void GetCurrentUser_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = _usersController.GetCurrentUser();

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public async void CheckUsername_UsernameIsAvailable_Returns200()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(It.IsAny<string>()))
                .ReturnsAsync(true);

            // Act
            var result = await _usersController.CheckUsername("username");

            // Assert
            var actionResult = Assert.IsType<ActionResult<bool>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async void CheckUsername_UsernameIsNotAvailable_Returns200()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(It.IsAny<string>()))
                .ReturnsAsync(false);

            // Act
            var result = await _usersController.CheckUsername("username");

            // Assert
            var actionResult = Assert.IsType<ActionResult<bool>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async void CheckUsername_ThrowsException_Returns500()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(It.IsAny<string>()))
                .ThrowsAsync(new Exception());

            // Act
            var result = await _usersController.CheckUsername("username");

            // Assert
            var actionResult = Assert.IsType<ActionResult<bool>>(result);
            var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public async void UpdateUser_ValidUserUpdateDto_Returns200()
        {
            // Arrange
            var userUpdate = new UserUpdateDto { Username = "NewUsername" };

            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(true);
            _userServiceMock.Setup(x => x.GetUserAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new UserDto { Id = _userId, Username = "OldUsername" });
            _userServiceMock.Setup(x => x.DoesUsernameExist(userUpdate.Username))
                .ReturnsAsync(false);
            _userServiceMock.Setup(x => x.UpdateUserAsync(It.IsAny<Guid>(), It.IsAny<UserUpdateDto>()))
                .ReturnsAsync(true);

            // Act
            var result = await _usersController.UpdateUser(_userId, new UserUpdateDto());

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void UpdateUser_UserDoesNotExist_Returns404()
        {
            // Arrange
            var userUpdate = new UserUpdateDto { Username = "NewUsername" };

            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(false);

            // Act
            var result = await _usersController.UpdateUser(_userId, userUpdate);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async void UpdateUser_Forbid_Returns403()
        {
            // Arrange
            var userUpdate = new UserUpdateDto { Username = "NewUsername" };

            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _usersController.UpdateUser(_userId, userUpdate);

            // Assert
            Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async void UpdateUser_UsernameIsNotAvailable_Returns400()
        {
            // Arrange
            var userUpdate = new UserUpdateDto { Username = "NewUsername" };

            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(true);
            _userServiceMock.Setup(x => x.GetUserAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new UserDto { Id = _userId, Username = "OldUsername" });
            _userServiceMock.Setup(x => x.DoesUsernameExist(userUpdate.Username))
                .ReturnsAsync(true);

            // Act
            var result = await _usersController.UpdateUser(_userId, userUpdate);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void UpdateUser_ThrowsException_Returns500()
        {
            // Arrange
            var userUpdate = new UserUpdateDto { Username = "NewUsername" };

            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(true);
            _userServiceMock.Setup(x => x.GetUserAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new UserDto { Id = _userId, Username = "OldUsername" });
            _userServiceMock.Setup(x => x.DoesUsernameExist(userUpdate.Username))
                .ThrowsAsync(new Exception());

            // Act
            var result = await _usersController.UpdateUser(_userId, userUpdate);

            // Assert
            Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, ((ObjectResult)result).StatusCode);
        }

        [Fact]
        public async void DeleteUser_UserExists_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(true);
            _userServiceMock.Setup(x => x.DeleteUserAsync(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            // Act
            var result = await _usersController.DeleteUser(_userId);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void DeleteUser_UserDoesNotExist_Returns404()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(false);

            // Act
            var result = await _usersController.DeleteUser(_userId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async void DeleteUser_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _usersController.DeleteUser(_userId);

            // Assert
            Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async void DeleteUser_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _userServiceMock.Setup(x => x.DoesUserExist(It.IsAny<Guid>()))
                .ReturnsAsync(true);
            _userServiceMock.Setup(x => x.DeleteUserAsync(It.IsAny<Guid>()))
                .ThrowsAsync(new Exception());

            // Act
            var result = await _usersController.DeleteUser(_userId);

            // Assert
            Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, ((ObjectResult)result).StatusCode);
        }
        #endregion
    }
}
