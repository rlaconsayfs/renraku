using System.ComponentModel.DataAnnotations;

namespace ContactManagerAPI.Entities.Dtos.PhoneNumberDtos
{
    public class PhoneNumberUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [MaxLength(50)]
        public string? Label { get; set; } = "Mobile";

        [Required]
        [MaxLength(15)]
        public string ContactNumber { get; set; }
    }
}
