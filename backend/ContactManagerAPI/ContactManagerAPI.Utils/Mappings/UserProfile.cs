using AutoMapper;
using ContactManagerAPI.Entities.Dtos.UserDtos;
using ContactManagerAPI.Entities.Models;

namespace ContactManagerAPI.Utils.Mappings
{
    public class UserProfile : Profile
    {
        /// <summary>
        /// Creates a mapping profile for the User entity
        /// </summary>
        public UserProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<User, UserCreateDto>()
                .ReverseMap()
                .ForMember(user => user.PasswordHash, op => op.MapFrom(dto => dto.Password))
                .ForMember(user => user.FirstName, op => op.MapFrom(dto => dto.FirstName.ToTitleCase())) // Capitalize first letter of first name
                .ForMember(user => user.LastName, op => op.MapFrom(dto => dto.LastName.ToTitleCase())); // Capitalize first letter of last name

            CreateMap<User, UserUpdateDto>()
                .ReverseMap()
                .ForMember(user => user.PasswordHash, op => op.MapFrom(dto => dto.Password))
                .ForMember(user => user.FirstName, op => op.MapFrom(dto => dto.FirstName.ToTitleCase())) // Capitalize first letter of first name
                .ForMember(user => user.LastName, op => op.MapFrom(dto => dto.LastName.ToTitleCase())); // Capitalize first letter of last name
        }
    }
}
