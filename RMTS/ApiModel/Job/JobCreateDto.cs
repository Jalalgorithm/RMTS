using RMTS.Enums;

namespace RMTS.ApiModel.Job
{
    public class JobCreateDto
    {
        public string Title { get; set; }

        public string JobDescription { get; set; }
        public JobLevel Level { get; set; }
        public int CompanyId { get; set; }

    }
}
