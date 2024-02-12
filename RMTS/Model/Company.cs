using RMTS.Enums;
using System.ComponentModel.DataAnnotations;

namespace RMTS.Model
{
    public class Company
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [MaxLength(350)]
        public string Description { get; set; } 
        public CompanySize Size { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;

        // relations
        public ICollection<Job> Jobs { get; set; }

    }
}
