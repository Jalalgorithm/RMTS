using RMTS.Enums;

namespace RMTS.ApiModel.Company
{
    public class CompanyCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public CompanySize Size { get; set; }

    }
}
