using ContactManagerAPI.Entities.Dtos.PhoneNumberDtos;
using System.ComponentModel.DataAnnotations;

namespace ContactManagerAPI.Entities.Dtos.ContactDtos
{
    public class ContactUpdateDto
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }

        [Required]
        [MaxLength(200)]
        public string DeliveryAddress { get; set; }

        [Required]
        [MaxLength(200)]
        public string BillingAddress { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string EmailAddress { get; set; }

        [MaxLength(50)]
        public string? Relationship { get; set; }

        public bool? IsFavorite { get; set; }

        public List<PhoneNumberUpdateDto> PhoneNumbers { get; set; } = new();
    }
}
