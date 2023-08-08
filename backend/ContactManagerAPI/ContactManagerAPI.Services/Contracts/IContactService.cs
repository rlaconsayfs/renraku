using ContactManagerAPI.Entities.Dtos.ContactDtos;
using Microsoft.AspNetCore.JsonPatch;

namespace ContactManagerAPI.Services.Contracts
{
    public interface IContactService
    {
        /// <summary>
        /// Gets all contacts for a <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>An IEnumerable of ContactDto</returns>
        Task<IEnumerable<ContactDto>> GetUserContactsAsync(Guid userId);

        /// <summary>
        /// Gets a contact for a <paramref name="userId"/> and <paramref name="contactId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <returns>A ContactDto</returns>
        Task<ContactDto?> GetContactAsync(Guid userId, int contactId);

        /// <summary>
        /// Creates a new contact for a <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactCreate"></param>
        /// <returns>The newly created Contact in ContactDto</returns>
        Task<ContactDto> CreateContactAsync(Guid userId, ContactCreateDto contactCreate);

        /// <summary>
        /// Updates a contact for a <paramref name="userId"/> and <paramref name="contactId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <param name="contactUpdate"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        Task<bool> UpdateContactAsync(Guid userId, int contactId, ContactUpdateDto contactUpdate);

        /// <summary>
        /// Updates a contact for a <paramref name="userId"/> and <paramref name="contactId"/> partially with a JsonPatchDocument
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <param name="patchDocument"></param>
        /// <returns>True if update is successful, false otherwise</returns>
        Task<bool> UpdatePartialContactAsync(Guid userId, int contactId, JsonPatchDocument<ContactUpdateDto> patchDocument);

        /// <summary>
        /// Deletes a contact for a <paramref name="userId"/> and <paramref name="contactId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <returns>True if delete is successful, false otherwise</returns>
        Task<bool> DeleteContactAsync(Guid userId, int contactId);

        /// <summary>
        /// Checks if a contact exists for a <paramref name="userId"/> and <paramref name="contactId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <returns>Ture if contact exists, false otherwise</returns>
        Task<bool> DoesContactExist(Guid userId, int contactId);
    }
}
