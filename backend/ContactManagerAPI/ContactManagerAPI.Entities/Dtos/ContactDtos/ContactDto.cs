using ContactManagerAPI.Entities.Dtos.PhoneNumberDtos;

namespace ContactManagerAPI.Entities.Dtos.ContactDtos
{
    public class ContactDto
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Gender { get; set; }
        public string DeliveryAddress { get; set; }
        public string BillingAddress { get; set; }
        public string EmailAddress { get; set; }
        public string Relationship { get; set; }
        public bool IsFavorite { get; set; }
        public List<PhoneNumberDto> PhoneNumbers { get; set; } = new();
    }
}
