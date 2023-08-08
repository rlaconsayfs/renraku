using System.ComponentModel.DataAnnotations;

namespace ContactManagerAPI.Entities.Dtos.PhoneNumberDtos
{
    public class PhoneNumberCreateDto
    {
        [MaxLength(50)]
        public string? Label { get; set; }

        [Required]
        [MaxLength(15)]
        public string ContactNumber { get; set; }
    }
}
