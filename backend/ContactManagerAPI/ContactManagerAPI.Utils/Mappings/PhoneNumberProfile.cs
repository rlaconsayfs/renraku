using AutoMapper;
using ContactManagerAPI.Entities.Dtos.PhoneNumberDtos;
using ContactManagerAPI.Entities.Models;

namespace ContactManagerAPI.Utils.Mappings
{
    public class PhoneNumberProfile : Profile
    {
        /// <summary>
        /// Creates mapping profile for PhoneNumber entity
        public PhoneNumberProfile()
        {
            CreateMap<PhoneNumber, PhoneNumberDto>().ReverseMap();

            CreateMap<PhoneNumber, PhoneNumberCreateDto>()
                .ReverseMap()
                .ForMember(phone => phone.Label, op => op.MapFrom(dto => dto.Label.ToTitleCase())); // Capitalize label

            CreateMap<PhoneNumber, PhoneNumberUpdateDto>()
                .ReverseMap()
                .ForMember(phone => phone.Label, op => op.MapFrom(dto => dto.Label.ToTitleCase())); // Capitalize label
        }
    }
}
