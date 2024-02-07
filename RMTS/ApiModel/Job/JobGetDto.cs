using RMTS.Enums;
using RMTS.Model;

namespace RMTS.ApiModel.Job
{
    public class JobGetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        public string JobDescription { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CompanyName { get; set; }
        public int CompanyId { get; set; }
          
    }
}
