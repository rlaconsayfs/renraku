using ContactManagerAPI.Entities.Dtos.ContactDtos;
using ContactManagerAPI.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ContactManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        #region Fields
        private readonly IContactService _contactService;
        private readonly IAuthService _authService;
        private readonly ILogger<ContactsController> _logger;
        #endregion

        #region Constructor
        public ContactsController(
            IContactService contactService,
            IAuthService authService,
            ILogger<ContactsController> logger)
        {
            _contactService = contactService;
            _authService = authService;
            _logger = logger;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Gets all contacts for the current user
        /// </summary>
        /// <returns>A list of contacts</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/contacts
        /// 
        /// </remarks>
        /// <response code="200">Returns a list of contacts</response>
        /// <response code="204">No contacts found</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Forbidden</response>
        /// <response code="500">Internal Server Error</response>
        [HttpGet]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<ContactDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetUserContacts()
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var contacts = await _contactService.GetUserContactsAsync(currentUser.Id);
                if (contacts.IsNullOrEmpty()) return NoContent();

                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contacts.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Gets a contact by <paramref name="contactId"/>
        /// </summary>
        /// <param name="contactId"></param>
        /// <returns>A contact</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/contacts/1
        /// 
        /// </remarks>
        /// <response code="200">Returns a contact</response>
        /// <response code="404">Contact not found</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Forbidden</response>
        /// <response code="500">Internal Server Error</response>
        [HttpGet("{contactId}", Name = "GetContact")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ContactDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ContactDto>> GetContact(int contactId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var contact = await _contactService.GetContactAsync(currentUser.Id, contactId);
                if (contact == null) return NotFound();

                return Ok(contact);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Creates a new contact
        /// </summary>
        /// <param name="contactCreate"></param>
        /// <returns>The newly created contact</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/contacts
        ///     {
        ///         "firstName": "Cosette",
        ///         "lastName": "Schneider",
        ///         "gender": "Female",
        ///         "deliveryAddress": "123 Main St.",
        ///         "billingAddress": "123 Main St.",
        ///         "emailAddress": "cosetteS@fakeemail",
        ///         "relationship": "Friend",
        ///         "isFavorite": true,
        ///         "phoneNumbers": [
        ///             {
        ///                 "label": "Home",
        ///                 "contactNumber": "0919-456-7890"
        ///             }
        ///         ]
        ///     }
        /// 
        /// </remarks>
        /// <response code="201">Returns the newly created contact</response>
        /// <response code="400">Contact details are invalid</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Forbidden</response>
        /// <response code="500">Internal Server Error</response>
        [HttpPost]
        [Authorize]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ContactDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateContactAsync([FromBody] ContactCreateDto contactCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var createdContact = await _contactService.CreateContactAsync(currentUser.Id, contactCreate);

                return CreatedAtRoute("GetContact", new { contactId = createdContact.Id }, createdContact);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating contact.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Updates a contact
        /// </summary>
        /// <param name="contactId"></param>
        /// <param name="contactUpdate"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT /api/contacts/1
        ///     {
        ///         "firstName": "Mikazuki",
        ///         "lastName": "Shizuka",
        ///         "gender": "Female",
        ///         "deliveryAddress": "123 Main St.",
        ///         "billingAddress": "123 Main St.",
        ///         "emailAddress": "mikazukiS@fakeemail",
        ///         "relationship": "Friend",
        ///         "isFavorite": true,
        ///         "phoneNumbers": [
        ///             {
        ///                 "label": "Home",
        ///                 "contactNumber": "0919-456-7890"
        ///             },
        ///             {
        ///                 "id": 1,
        ///                 "label": "Work",
        ///                 "contactNumber": "0919-456-7891"
        ///             }
        ///         ]
        ///     }
        /// 
        /// </remarks>
        /// <response code="200">Returns true if update is successful, false otherwise</response>
        /// <response code="400">Contact details are invalid</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Forbidden</response>
        /// <response code="404">Contact not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpPut("{contactId}")]
        [Authorize]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateContactAsync(int contactId, [FromBody] ContactUpdateDto contactUpdate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var doesContactExist = await _contactService.DoesContactExist(currentUser.Id, contactId);
                if (!doesContactExist) return NotFound();

                var updated = await _contactService.UpdateContactAsync(currentUser.Id, contactId, contactUpdate);
                
                return Ok(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Updates a contact partially
        /// </summary>
        /// <param name="contactId"></param>
        /// <param name="patchDocument"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PATCH /api/contacts/1
        ///     {
        ///         "op": "replace",
        ///         "path": "/isFavorite",
        ///         "value": true
        ///     }
        /// 
        /// </remarks>
        /// <reponse code="200">Returns true if update is successful, false otherwise</reponse>
        /// <reponse code="400">Contact details are invalid</reponse>
        /// <reponse code="401">Unauthorized</reponse>
        /// <reponse code="403">Forbidden</reponse>
        /// <reponse code="404">Contact not found</reponse>
        /// <reponse code="500">Internal Server Error</reponse>
        [HttpPatch("{contactId}")]
        [Authorize]
        [Consumes("application/json-patch+json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdatePartialIsFavoriteContact(int contactId, JsonPatchDocument<ContactUpdateDto> patchDocument)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var doesContactExist = await _contactService.DoesContactExist(currentUser.Id, contactId);
                if (!doesContactExist) return NotFound();

                var result = await _contactService.UpdatePartialContactAsync(currentUser.Id, contactId, patchDocument);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Deletes a contact
        /// </summary>
        /// <param name="contactId"></param>
        /// <returns>True if deletion is successful, false otherwise</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     DELETE /api/contacts/1
        /// 
        /// </remarks>
        /// <reponse code="200">Returns true if deletion is successful, false otherwise</reponse>
        /// <reponse code="401">Unauthorized</reponse>
        /// <reponse code="403">Forbidden</reponse>
        /// <reponse code="404">Contact not found</reponse>
        /// <reponse code="500">Internal Server Error</reponse>
        [HttpDelete("{contactId}")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteContactAsync(int contactId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var doesContactExist = await _contactService.DoesContactExist(currentUser.Id, contactId);
                if (!doesContactExist) return NotFound();

                var deleted = await _contactService.DeleteContactAsync(currentUser.Id, contactId);

                return Ok(deleted);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        #endregion
    }
}
