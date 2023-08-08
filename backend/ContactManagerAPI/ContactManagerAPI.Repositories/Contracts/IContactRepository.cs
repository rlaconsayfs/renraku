using ContactManagerAPI.Entities.Models;

namespace ContactManagerAPI.Repositories.Contracts
{
    public interface IContactRepository
    {
        /// <summary>
        /// Gets all contacts of a <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>An IEnumerable of Contact</returns>
        Task<IEnumerable<Contact>> GetUserContactsAsync(Guid userId);

        /// <summary>
        /// Gets a contact of a <paramref name="userId"/> by <paramref name="contactId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <returns>A Contact</returns>
        Task<Contact?> GetContactAsync(Guid userId, int contactId);

        /// <summary>
        /// Creates a new contact
        /// </summary>
        /// <param name="contact"></param>
        /// <returns>The newly created contact</returns>
        Task<Contact> CreateContactAsync(Contact contact);

        /// <summary>
        /// Updates a contact
        /// </summary>
        /// <param name="contact"></param>
        /// <returns>True if upddate is successful, false otherwise</returns>
        Task<bool> UpdateContactAsync(Contact contact);

        /// <summary>
        /// Deletes a contact
        /// </summary>
        /// <param name="contact"></param>
        /// <returns>True if deletion is successful, false otherwise</returns>
        Task<bool> DeleteContactAsync(Contact contact);

        /// <summary>
        /// Checks if a contact exists
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="contactId"></param>
        /// <returns>True if contact exists, false otherwise</returns>
        Task<bool> DoesContactExist(Guid userId, int contactId);
    }
}
