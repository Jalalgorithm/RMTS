using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace RMTS.Model
{
    
    public class Candidate
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string  LastName { get; set; }
        [MaxLength(20)]
        public string Phone { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(350)]
        public string CoverLetter { get; set; }
        public string ResumeUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;

        //relations
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
