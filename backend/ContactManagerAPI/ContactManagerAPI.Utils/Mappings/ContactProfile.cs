using AutoMapper;
using ContactManagerAPI.Entities.Dtos.ContactDtos;
using ContactManagerAPI.Entities.Models;

namespace ContactManagerAPI.Utils.Mappings
{
    public class ContactProfile : Profile
    {
        /// <summary>
        /// Creates mapping profile for Contact entity
        /// </summary>
        public ContactProfile()
        {
            CreateMap<Contact, ContactDto>().ReverseMap();

            CreateMap<Contact, ContactCreateDto>()
                .ReverseMap()
                .ForMember(contact => contact.PhoneNumbers, op => op.MapFrom(dto => dto.PhoneNumbers)) // Map phone numbers
                .ForMember(contact => contact.FirstName, op => op.MapFrom(dto => dto.FirstName.ToTitleCase())) // Capitalize first letter of first name
                .ForMember(contact => contact.LastName, op => op.MapFrom(dto => dto.LastName.ToTitleCase())) // Capitalize first letter of last name
                .ForMember(contact => contact.DeliveryAddress, op => op.MapFrom(dto => dto.DeliveryAddress.ToTitleCase())) // Capitalize first letter of delivery address
                .ForMember(contact => contact.BillingAddress, op => op.MapFrom(dto => dto.BillingAddress.ToTitleCase())); // Capitalize first letter of billing address

            CreateMap<Contact, ContactUpdateDto>()
                .ReverseMap()
                .ForMember(contact => contact.FirstName, op => op.MapFrom(dto => dto.FirstName.ToTitleCase())) // Capitalize first letter of first name
                .ForMember(contact => contact.LastName, op => op.MapFrom(dto => dto.LastName.ToTitleCase())) // Capitalize first letter of last name
                .ForMember(contact => contact.DeliveryAddress, op => op.MapFrom(dto => dto.DeliveryAddress.ToTitleCase())) // Capitalize first letter of delivery address
                .ForMember(contact => contact.BillingAddress, op => op.MapFrom(dto => dto.BillingAddress.ToTitleCase())); // Capitalize first letter of billing address
        }
    }
}
