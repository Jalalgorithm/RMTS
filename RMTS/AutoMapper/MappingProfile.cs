using AutoMapper;
using RMTS.ApiModel.Company;
using RMTS.ApiModel.Job;
using RMTS.Model;

namespace RMTS.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company, CompanyGetDto>();

            CreateMap<JobCreateDto, Job>();
            CreateMap<Job, JobGetDto>()
                .ForMember(des => des.CompanyName, opt => opt.MapFrom(src => src.Company.Name));
        }
    }
}
