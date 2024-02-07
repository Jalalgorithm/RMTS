using RMTS.Enums;

namespace RMTS.Model
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        public string JobDescription { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; }= true;

        

        //relations
        public int CompanyId { get; set; }
        public Company Company { get; set; }

        public ICollection<Candidate> Candidates { get; set; }
    }
}
