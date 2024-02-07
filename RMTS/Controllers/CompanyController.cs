using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMTS.ApiModel.Company;
using RMTS.Data;
using RMTS.Model;

namespace RMTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CompanyController(ApplicationDbContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto companyCreate)
        {
            var newCompany = _mapper.Map<Company>(companyCreate);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company Created Successfully");
        }

        [HttpGet("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompany()
        {
            var companies = await _context.Companies.ToListAsync();

            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id , [FromBody]CompanyCreateDto updateCompany)
        {
            var mainCompany =await _context.Companies.FindAsync(id);

            var updatedCompany = _mapper.Map<CompanyCreateDto, Company>(updateCompany, mainCompany);

            await _context.SaveChangesAsync();

            return Ok("Company has been successfully updated");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

             _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok("Company Data has been deleted");
        }
    }
}
