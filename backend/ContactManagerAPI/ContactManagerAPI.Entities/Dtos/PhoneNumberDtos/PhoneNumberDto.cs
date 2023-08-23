namespace ContactManagerAPI.Entities.Dtos.PhoneNumberDtos
{
    public class PhoneNumberDto
    {
        public int Id { get; set; }
        public int ContactId { get; set; }
        public string Label { get; set; }
        public string ContactNumber { get; set; }
    }
}
