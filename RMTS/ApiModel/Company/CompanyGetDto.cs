using RMTS.Enums;

namespace RMTS.ApiModel.Company
{
    public class CompanyGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CompanySize Size { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
