using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ContactManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        #region Fields
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly ILogger<UsersController> _logger;
        #endregion

        #region Constructor
        public UsersController(
            IUserService userService,
            IAuthService authService,
            ILogger<UsersController> logger)
        {
            _userService = userService;
            _authService = authService;
            _logger = logger;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>A list of users</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/users
        /// 
        /// </remarks>
        /// <reponse code="200">Returns a list of users</reponse>
        /// <reponse code="204">No users found</reponse>
        /// <reponse code="500">Internal server error</reponse>
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            try
            {
                var users = await _userService.GetUsersAsync();
                if(users.IsNullOrEmpty()) return NoContent();
                
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting users.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Gets a user by <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>A user</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/users/1
        /// 
        /// </remarks>
        /// <reponse code="200">Returns a user</reponse>
        /// <reponse code="404">User not found</reponse>
        /// <reponse code="401">Unauthorized</reponse>
        /// <reponse code="403">Forbidden</reponse>
        /// <reponse code="500">Internal server error</reponse>
        [HttpGet("{userId}", Name = "GetUser")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> GetUser(Guid userId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();
                if (currentUser.Id != userId) return Forbid();

                var user = await _userService.GetUserAsync(userId);
                if (user == null) return NotFound();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("currentUser")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserDto> GetCurrentUser()
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                return Ok(currentUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting current user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }


        [HttpGet("checkUsername")]
        [AllowAnonymous]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> CheckUsername(string username)
        {
            try
            {
                var result = await _userService.DoesUsernameExist(username);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking username.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userUpdate"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT /api/users/1
        ///     {
        ///         "username": "ichigo77",
        ///         "password": "passw0rD",
        ///         "email": "ichigo77@gmail",
        ///         "firstName": "Ichigo",
        ///         "lastName": "Neechan"
        ///     }
        /// 
        /// </remarks>
        /// <reponse code="200">Returns true if update is successful</reponse>
        /// <reponse code="400">Bad request</reponse>
        /// <reponse code="401">Unauthorized</reponse>
        /// <reponse code="403">Forbidden</reponse>
        /// <reponse code="404">User not found</reponse>
        /// <reponse code="500">Internal server error</reponse>
        [HttpPut("{userId}")]
        [Authorize]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateUser(Guid userId, UserUpdateDto userUpdate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();
                if (currentUser.Id != userId) return Forbid();
                if (!await _userService.DoesUserExist(userId)) return NotFound();

                var user = await _userService.GetUserAsync(userId);
                if(user.Username != userUpdate.Username)
                {
                    if (await _userService.DoesUsernameExist(userUpdate.Username)) return BadRequest("Username already exists");
                }

                var result = await _userService.UpdateUserAsync(userId, userUpdate);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>True if deletion is successful, false otherwise</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     DELETE /api/users/1
        /// 
        /// </remarks>
        /// <reponse code="200">Returns true if deletion is successful</reponse>
        /// <reponse code="401">Unauthorized</reponse>
        /// <reponse code="403">Forbidden</reponse>
        /// <reponse code="404">User not found</reponse>
        /// <reponse code="500">Internal server error</reponse>
        [HttpDelete("{userId}")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();
                if (currentUser.Id != userId) return Forbid();
                if (!await _userService.DoesUserExist(userId)) return NotFound();

                var result = await _userService.DeleteUserAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        #endregion
    }
}
