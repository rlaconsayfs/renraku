using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Fields
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        private readonly ILogger<AuthController> _logger;
        #endregion

        #region Constructor
        public AuthController(
            IAuthService authService,
            IUserService userService,
            ILogger<AuthController> logger)
        {
            _authService = authService;
            _userService = userService;
            _logger = logger;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Registers a new user
        /// </summary>
        /// <param name="userCreate"></param>
        /// <returns>The newly created User</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/auth/register
        ///     {
        ///         "username": "galletta",
        ///         "password": "passw0rD123",
        ///         "firstName": "Jeanne",
        ///         "lastName": "Galletta",
        ///         "email": "jeannegalletta@fakeemail"
        ///     }
        /// 
        /// </remarks>
        /// <response code="201">Successfully registered new user</response>
        /// <response code="400">User details are invalid</response>
        /// <response code="500">Internal server error</response>
        [HttpPost("register")]
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RegisterUser(UserCreateDto userCreate)
        {
            try
            {
                if(await _userService.DoesUsernameExist(userCreate.Username)) return BadRequest("Username already exists");

                var createdUser = await _authService.RegisterUser(userCreate);
                if(createdUser == null) return BadRequest("Username already exists");

                return CreatedAtRoute("GetUser", new { userId = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error registering user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Logs in a user
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns>A jwt token</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/auth/login
        ///     {
        ///         "username": "galletta",
        ///         "password": "passw0rD123"
        ///     }
        /// 
        /// </remarks>
        /// <response code="200">Successfully logged in user</response>
        /// <response code="404">Username does not exist</response>
        /// <response code="401">Invalid username or password</response>
        /// <response code="500">Internal server error</response>
        [HttpPost("login")]
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            try
            {
                if(!await _userService.DoesUsernameExist(userLogin.Username)) return NotFound("Username does not exist");

                var login = await _authService.Login(userLogin);
                if(string.IsNullOrEmpty(login)) return Unauthorized("Invalid username or password");

                return Ok(login);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error logging in user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        #endregion
    }
}
