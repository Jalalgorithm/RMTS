namespace RMTS.Model
{
    public class Candidate
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string  LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
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
