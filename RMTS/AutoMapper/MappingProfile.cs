using AutoMapper;
using RMTS.ApiModel.Company;
using RMTS.Model;

namespace RMTS.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company, CompanyGetDto>();
        }
    }
}
