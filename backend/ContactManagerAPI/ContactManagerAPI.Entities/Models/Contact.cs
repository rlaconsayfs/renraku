using System.ComponentModel.DataAnnotations;

namespace ContactManagerAPI.Entities.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

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

        public bool? IsFavorite { get; set; } = false;

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        public List<PhoneNumber>? PhoneNumbers { get; set; } = new();

        public User User { get; set; }
    }
}
