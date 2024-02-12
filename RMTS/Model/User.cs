using System.ComponentModel.DataAnnotations;

namespace RMTS.Model
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]    
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [Required]
        [MaxLength(100)]
        public string Password { get; set; } 
        public string Role { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
