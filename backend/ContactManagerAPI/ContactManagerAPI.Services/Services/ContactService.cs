using AutoMapper;
using ContactManagerAPI.Entities.Dtos.ContactDtos;
using ContactManagerAPI.Entities.Models;
using ContactManagerAPI.Repositories.Contracts;
using ContactManagerAPI.Services.Contracts;
using Microsoft.AspNetCore.JsonPatch;

namespace ContactManagerAPI.Services.Services
{
    public class ContactService : IContactService
    {
        #region Fields
        private readonly IContactRepository _contactRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        #endregion

        #region Constructor
        public ContactService(
            IContactRepository contactRepository,
            IUserService userService,
            IMapper mapper)
        {
            _contactRepository = contactRepository;
            _userService = userService;
            _mapper = mapper;
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<ContactDto>> GetUserContactsAsync(Guid userId)
        {
            var contacts = await _contactRepository.GetUserContactsAsync(userId);

            return _mapper.Map<IEnumerable<ContactDto>>(contacts);
        }

        public async Task<ContactDto?> GetContactAsync(Guid userId, int contactId)
        {
            var contact = await _contactRepository.GetContactAsync(userId, contactId);

            return _mapper.Map<ContactDto>(contact);
        }

        public async Task<ContactDto> CreateContactAsync(Guid userId, ContactCreateDto contactCreate)
        {
            var contact = _mapper.Map<Contact>(contactCreate);
            contact.UserId = userId;
            var createdContact = await _contactRepository.CreateContactAsync(contact);

            return _mapper.Map<ContactDto>(createdContact);
        }

        public async Task<bool> UpdateContactAsync(Guid userId, int contactId, ContactUpdateDto contactUpdate)
        {
            var contact = _mapper.Map<Contact>(contactUpdate);
            contact.Id = contactId;
            contact.UserId = userId;
            var updatedContact = await _contactRepository.UpdateContactAsync(contact);

            return updatedContact;
        }

        public async Task<bool> UpdatePartialContactAsync(Guid userId, int contactId, JsonPatchDocument<ContactUpdateDto> patchDocument)
        {
            try
            {
                var contact = await _contactRepository.GetContactAsync(userId, contactId);
                var contactToPatch = _mapper.Map<ContactUpdateDto>(contact);
                patchDocument.ApplyTo(contactToPatch);
                _mapper.Map(contactToPatch, contact);
                var updatedContact = await _contactRepository.UpdateContactAsync(contact);

                return updatedContact;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteContactAsync(Guid userId, int contactId)
        {
            var contact = await _contactRepository.GetContactAsync(userId, contactId);
            var deletedContact = await _contactRepository.DeleteContactAsync(contact!);

            return deletedContact;
        }

        public async Task<bool> DoesContactExist(Guid userId, int contactId)
        {
            return await _contactRepository.DoesContactExist(userId, contactId);
        }
        #endregion
    }
}
