﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles ="Admin")]
        [HttpPost("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto companyCreate)
        {
            var newCompany = _mapper.Map<Company>(companyCreate);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company Created Successfully");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompany()
        {
            var companies = await _context.Companies.ToListAsync();

            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);

        }

        [Authorize(Roles ="Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id , [FromBody]CompanyCreateDto updateCompany)
        {
            var mainCompany =await _context.Companies.FindAsync(id);

            var updatedCompany = _mapper.Map<CompanyCreateDto, Company>(updateCompany, mainCompany);

            await _context.SaveChangesAsync();

            return Ok("Company has been successfully updated");

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies
                .Include(x=>x.Jobs)
                .FirstOrDefaultAsync(x=>x.Id==id);
             

             _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok("Company Data has been deleted");
        }
    }
}
