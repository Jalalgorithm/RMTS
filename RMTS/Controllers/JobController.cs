using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMTS.ApiModel.Job;
using RMTS.Data;
using RMTS.Model;

namespace RMTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public JobController(ApplicationDbContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto jobCreate)
        {
            var newJob = _mapper.Map<Job>(jobCreate);

            await _context.Jobs.AddAsync(newJob);
            await _context.SaveChangesAsync();

            return Ok("Job has been created");

        }

        [HttpGet("Get")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        {
            var jobs = await _context.Jobs.Include(c=>c.Company).ToListAsync();

            var convertedJobs = _mapper.Map<IEnumerable<JobGetDto>>(jobs);

            return Ok(convertedJobs);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobs(int id , [FromBody]JobCreateDto updateJob)
        {
            var job = await _context.Jobs
                .Include(c=>c.Company)
                .FirstOrDefaultAsync(x=>x.Id ==id);

            var updatedJob = _mapper.Map<JobCreateDto, Job>(updateJob, job);

            await _context.SaveChangesAsync();

            return Ok("job has been updated");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var job = await _context.Jobs.FindAsync(id);

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return Ok("Job has been successfully deleted");
        }

    }
}
