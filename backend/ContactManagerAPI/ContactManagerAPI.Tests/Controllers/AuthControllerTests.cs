using ContactManagerAPI.Controllers;
using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Services.Contracts;
using ContactManagerAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace ContactManagerAPI.Tests.Controllers
{
    public class AuthControllerTests
    {
        #region Fields
        private readonly AuthController _authController;
        private readonly Mock<IAuthService> _authServiceMock;
        private readonly Mock<IUserService> _userServiceMock;
        private readonly Mock<ILogger<AuthController>> _loggerMock;
        private UserCreateDto _userCreate;
        private UserLoginDto _userLogin;
        #endregion

        #region Constructor
        public AuthControllerTests()
        {
            _authServiceMock = new Mock<IAuthService>();
            _userServiceMock = new Mock<IUserService>();
            _loggerMock = new Mock<ILogger<AuthController>>();
            _authController = new AuthController(
                _authServiceMock.Object,
                _userServiceMock.Object,
                _loggerMock.Object);

            _userCreate = new UserCreateDto
            {
                Username = "galletta",
                Password = "passw0rD123",
                FirstName = "Jeanne",
                LastName = "Galletta",
                Email = "jeannegalletta@fakeemail"
            };

            _userLogin = new UserLoginDto
            {
                Username = "galletta",
                Password = "passw0rD123"
            };
        }
        #endregion

        #region Tests
        [Fact]
        public async void RegisterUser_ValidUserCreateDto_Returns201()
        {
            // Arrange

            var expectedResult = new UserDto
            {
                Id = new Guid(),
                PasswordHash = PasswordManager.HashPassword(_userCreate.Password),
                Username = _userCreate.Username,
                FirstName = _userCreate.FirstName,
                LastName = _userCreate.LastName,
                Email = _userCreate.Email
            };

            _userServiceMock.Setup(x => x.DoesUsernameExist(_userCreate.Username))
                .ReturnsAsync(false);
            _authServiceMock.Setup(x => x.RegisterUser(_userCreate))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _authController.RegisterUser(_userCreate);

            // Assert
            Assert.IsType<CreatedAtRouteResult>(result);
        }

        [Fact]
        public async void RegisterUser_UsernameExists_Returns400()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(_userCreate.Username))
                .ReturnsAsync(true);

            // Act
            var result = await _authController.RegisterUser(_userCreate);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void RegisterUser_RegisterFails_Returns400()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(_userCreate.Username))
                .ReturnsAsync(false);
            _authServiceMock.Setup(x => x.RegisterUser(_userCreate))
                .ReturnsAsync((UserDto)null!);

            // Act
            var result = await _authController.RegisterUser(_userCreate);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void RegisterUser_ThrowsException_Returns500()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(_userCreate.Username))
                .ReturnsAsync(false);
            _authServiceMock.Setup(x => x.RegisterUser(_userCreate))
                .ThrowsAsync(new Exception());

            // Act
            var result = await _authController.RegisterUser(_userCreate);

            // Assert
            Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, ((ObjectResult)result).StatusCode);
        }

        [Fact]
        public async void LoginUser_ValidUserLoginDto_Returns200()
        {
            // Arrange
            var expectedJWTToken = "JWTToken";

            _userServiceMock.Setup(x => x.DoesUsernameExist(_userLogin.Username))
                .ReturnsAsync(true);
            _authServiceMock.Setup(x => x.Login(_userLogin))
                .ReturnsAsync(expectedJWTToken);

            // Act
            var result = await _authController.Login(_userLogin);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void LoginUser_UsernameDoesNotExist_Returns400()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(_userLogin.Username))
                .ReturnsAsync(false);

            // Act
            var result = await _authController.Login(_userLogin);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async void LoginUser_InvalidUserLoginDto_Returns404()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(_userLogin.Username))
                .ReturnsAsync(true);
            _authServiceMock.Setup(x => x.Login(_userLogin))
                .ReturnsAsync((string)null!);

            // Act
            var result = await _authController.Login(_userLogin);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void LoginUser_ThrowsException_Returns500()
        {
            // Arrange
            _userServiceMock.Setup(x => x.DoesUsernameExist(_userLogin.Username))
                .ReturnsAsync(true);
            _authServiceMock.Setup(x => x.Login(_userLogin))
                .ThrowsAsync(new Exception());

            // Act
            var result = await _authController.Login(_userLogin);

            // Assert
            Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, ((ObjectResult)result).StatusCode);
        }
        #endregion
    }
}
