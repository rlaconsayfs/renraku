using ContactManagerAPI.Entities.Models;
using ContactManagerAPI.Repositories.Context;
using ContactManagerAPI.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ContactManagerAPI.Repositories.Repositories
{
    public class ContactRepository : IContactRepository
    {
        #region Fields
        private readonly ContactContext _context;
        #endregion

        #region Constructor
        public ContactRepository(ContactContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<Contact>> GetUserContactsAsync(Guid userId)
        {
            return await _context.Contacts.Include(con => con.PhoneNumbers).Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<Contact?> GetContactAsync(Guid userId, int contactId)
        {
            return await _context.Contacts.Include(con => con.PhoneNumbers).FirstOrDefaultAsync(c => c.UserId == userId && c.Id == contactId);
        }

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> UpdateContactAsync(Contact contact)
        {
            var contactToUpdate = await _context.Contacts.Include(contact => contact.PhoneNumbers).FirstOrDefaultAsync(c => c.Id == contact.Id);
            if(contactToUpdate is null) return false;

            contactToUpdate.FirstName = contact.FirstName;
            contactToUpdate.LastName = contact.LastName;
            contactToUpdate.Gender = contact.Gender;
            contactToUpdate.DeliveryAddress = contact.DeliveryAddress;
            contactToUpdate.BillingAddress = contact.BillingAddress;
            contactToUpdate.EmailAddress = contact.EmailAddress;
            contactToUpdate.Relationship = contact.Relationship;
            contactToUpdate.IsFavorite = contact.IsFavorite;
            contactToUpdate.UpdatedAt = DateTime.Now;

            foreach(var updatedPhone in contact.PhoneNumbers)
            {
                if(updatedPhone.Id == 0)
                {
                    contactToUpdate.PhoneNumbers.Add(updatedPhone);
                }
                else
                {
                    var phoneToUpdate = contactToUpdate.PhoneNumbers.FirstOrDefault(p => p.Id == updatedPhone.Id);
                    if(phoneToUpdate is not null)
                    {
                        phoneToUpdate.Label = updatedPhone.Label;
                        phoneToUpdate.ContactNumber = updatedPhone.ContactNumber;
                    }
                }
            }

            contactToUpdate.PhoneNumbers.RemoveAll(p => !contact.PhoneNumbers.Any(p2 => p2.Id == p.Id));

            try
            {
                await _context.SaveChangesAsync();

                return true;
            }
            catch(DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteContactAsync(Contact contact)
        {
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DoesContactExist(Guid userId, int contactId)
        {
            return await _context.Contacts.AnyAsync(c => c.UserId == userId && c.Id == contactId);
        }
        #endregion
    }
}
