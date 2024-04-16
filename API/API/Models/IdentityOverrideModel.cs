namespace API.Models
{
    public class IdentityOverrideModel
    {
        public string? GivenName { get; set; }
        public string? IdmPreferredName { get; set; }
        public string? Sn { get; set; }
        public string IdmGUID { get; set; }
        public char? IdmStatus { get; set; }
        public string? description { get; set; }
        public string? CreatedAt { get; set; }
        public int? Active { get; set; }
        public string? LastUpdated { get; set; }

    }
}
