using ContactManagerAPI.Controllers;
using ContactManagerAPI.Entities.Dtos.ContactDtos;
using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Security.Claims;

namespace ContactManagerAPI.Tests.Controllers
{
    public class ContactsControllerTests
    {
        #region Fields
        private readonly ContactsController _contactsController;
        private readonly Mock<IContactService> _contactServiceMock;
        private readonly Mock<IAuthService> _authServiceMock;
        private readonly Mock<ILogger<ContactsController>> _loggerMock;
        private readonly Guid _userId;
        private readonly UserDto _currentUser;
        #endregion

        #region Constructor
        public ContactsControllerTests()
        {
            _contactServiceMock = new Mock<IContactService>();
            _authServiceMock = new Mock<IAuthService>();
            _loggerMock = new Mock<ILogger<ContactsController>>();
            _contactsController = new ContactsController(
                _contactServiceMock.Object,
                _authServiceMock.Object,
                _loggerMock.Object);

            _userId = new Guid();
            _currentUser = new UserDto { Id = _userId };

            var claimsIdentity = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, _userId.ToString()) });
            var httpContext = new DefaultHttpContext();
            httpContext.User = new ClaimsPrincipal(claimsIdentity);
            _contactsController.ControllerContext = new ControllerContext { HttpContext = httpContext };
        }
        #endregion

        #region Tests
        [Fact]
        public async void GetContacts_ValidUserId_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.GetUserContactsAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new List<ContactDto>() { new ContactDto() });

            // Act
            var result = await _contactsController.GetUserContacts();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<ContactDto>>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async void GetContacts_NoContacts_Returns204()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.GetUserContactsAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new List<ContactDto>());

            // Act
            var result = await _contactsController.GetUserContacts();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<ContactDto>>>(result);
            var noContentResult = Assert.IsType<NoContentResult>(actionResult.Result);
            Assert.Equal(204, noContentResult.StatusCode);
        }

        [Fact]
        public async void GetContacts_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _contactsController.GetUserContacts();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<ContactDto>>>(result);
            var forbidResult = Assert.IsType<ForbidResult>(actionResult.Result);
        }

        [Fact]
        public async void GetContacts_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = await _contactsController.GetUserContacts();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<ContactDto>>>(result);
            var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public async Task GetContact_ValidId_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.GetContactAsync(It.IsAny<Guid>(), It.IsAny<int>()))
                .ReturnsAsync(new ContactDto());

            // Act
            var result = await _contactsController.GetContact(It.IsAny<int>());

            // Assert
            var actionResult = Assert.IsType<ActionResult<ContactDto>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task GetContact_NotFound_Returns404()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.GetContactAsync(It.IsAny<Guid>(), It.IsAny<int>()))
                .ReturnsAsync((ContactDto)null!);

            // Act
            var result = await _contactsController.GetContact(It.IsAny<int>());

            // Assert
            var actionResult = Assert.IsType<ActionResult<ContactDto>>(result);
            var notFoundResult = Assert.IsType<NotFoundResult>(actionResult.Result);
            Assert.Equal(404, notFoundResult.StatusCode);
        }

        [Fact]
        public async Task GetContact_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _contactsController.GetContact(It.IsAny<int>());

            // Assert
            var actionResult = Assert.IsType<ActionResult<ContactDto>>(result);
            var forbidResult = Assert.IsType<ForbidResult>(actionResult.Result);
        }

        [Fact]
        public async Task GetContact_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = await _contactsController.GetContact(It.IsAny<int>());

            // Assert
            var actionResult = Assert.IsType<ActionResult<ContactDto>>(result);
            var objectResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public async Task CreateContact_ValidContact_Returns201()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.CreateContactAsync(It.IsAny<Guid>(), It.IsAny<ContactCreateDto>()))
                .ReturnsAsync(new ContactDto());

            // Act
            var result = await _contactsController.CreateContactAsync(It.IsAny<ContactCreateDto>());

            // Assert
            Assert.IsType<CreatedAtRouteResult>(result);
        }

        [Fact]
        public async Task CreateContact_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _contactsController.CreateContactAsync(It.IsAny<ContactCreateDto>());

            // Assert
            Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async Task CreateContact_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = await _contactsController.CreateContactAsync(It.IsAny<ContactCreateDto>());

            // Assert
            Assert.IsType<ObjectResult>(result);
        }

        [Fact]
        public async Task UpdateContact_ValidContact_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.DoesContactExist(_userId, It.IsAny<int>()))
                .ReturnsAsync(true);

            // Act
            var result = await _contactsController.UpdateContactAsync(It.IsAny<int>(), It.IsAny<ContactUpdateDto>());

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task UpdateContact_NotFound_Returns404()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.DoesContactExist(_userId, It.IsAny<int>()))
                .ReturnsAsync(false);

            // Act
            var result = await _contactsController.UpdateContactAsync(It.IsAny<int>(), It.IsAny<ContactUpdateDto>());

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateContact_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _contactsController.UpdateContactAsync(It.IsAny<int>(), It.IsAny<ContactUpdateDto>());

            // Assert
            Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async Task UpdateContact_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = await _contactsController.UpdateContactAsync(It.IsAny<int>(), It.IsAny<ContactUpdateDto>());

            // Assert
            Assert.IsType<ObjectResult>(result);
        }

        [Fact]
        public async void UpdatePartialIsFavoriteContact_ValidRequest_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.DoesContactExist(_userId, It.IsAny<int>()))
                .ReturnsAsync(true);
            _contactServiceMock.Setup(x => x.UpdatePartialContactAsync(_userId, It.IsAny<int>(), It.IsAny<JsonPatchDocument<ContactUpdateDto>>()))
                .ReturnsAsync(true);

            // Act
            var result = await _contactsController.UpdatePartialIsFavoriteContact(It.IsAny<int>(), It.IsAny<JsonPatchDocument<ContactUpdateDto>>());

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void UpdatePartialIsFavoriteContact_NotFound_Returns404()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.DoesContactExist(_userId, It.IsAny<int>()))
                .ReturnsAsync(false);

            // Act
            var result = await _contactsController.UpdatePartialIsFavoriteContact(It.IsAny<int>(), It.IsAny<JsonPatchDocument<ContactUpdateDto>>());

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async void UpdatePartialIsFavoriteContact_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _contactsController.UpdatePartialIsFavoriteContact(It.IsAny<int>(), It.IsAny<JsonPatchDocument<ContactUpdateDto>>());

            // Assert
            Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async void UpdatePartialIsFavoriteContact_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = await _contactsController.UpdatePartialIsFavoriteContact(It.IsAny<int>(), It.IsAny<JsonPatchDocument<ContactUpdateDto>>());

            // Assert
            Assert.IsType<ObjectResult>(result);
        }

        [Fact]
        public async Task DeleteContact_ValidId_Returns200()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.DoesContactExist(_userId, It.IsAny<int>()))
                .ReturnsAsync(true);

            // Act
            var result = await _contactsController.DeleteContactAsync(It.IsAny<int>());

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task DeleteContact_NotFound_Returns404()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns(_currentUser);
            _contactServiceMock.Setup(x => x.DoesContactExist(_userId, It.IsAny<int>()))
                .ReturnsAsync(false);

            // Act
            var result = await _contactsController.DeleteContactAsync(It.IsAny<int>());

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteContact_Forbid_Returns403()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Returns((UserDto)null!);

            // Act
            var result = await _contactsController.DeleteContactAsync(It.IsAny<int>());

            // Assert
            Assert.IsType<ForbidResult>(result);
        }

        [Fact]
        public async Task DeleteContact_ThrowsException_Returns500()
        {
            // Arrange
            _authServiceMock.Setup(x => x.GetCurrentUser(It.IsAny<ClaimsIdentity>()))
                .Throws(new Exception());

            // Act
            var result = await _contactsController.DeleteContactAsync(It.IsAny<int>());

            // Assert
            Assert.IsType<ObjectResult>(result);
        }
        #endregion
    }
}
