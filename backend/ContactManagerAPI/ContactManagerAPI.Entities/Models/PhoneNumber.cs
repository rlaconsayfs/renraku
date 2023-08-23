using System.ComponentModel.DataAnnotations;

namespace ContactManagerAPI.Entities.Models
{
    public class PhoneNumber
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ContactId { get; set; }

        [MaxLength(50)]
        public string? Label { get; set; } = "Mobile";

        [Required]
        [MaxLength(15)]
        public string ContactNumber { get; set; }

        public Contact Contact { get; set; }
    }
}
