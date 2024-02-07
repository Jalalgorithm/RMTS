using RMTS.Enums;

namespace RMTS.Model
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public CompanySize Size { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;

        // relations
        public ICollection<Job> Jobs { get; set; }

    }
}
