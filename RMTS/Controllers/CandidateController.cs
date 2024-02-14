using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMTS.ApiModel.Candidate;
using RMTS.Data;
using RMTS.Model;

namespace RMTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CandidateController(ApplicationDbContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm]CandidateCreateDto candidateCreate , IFormFile pdfFile )
        {

            var fiveMegabyte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";

            if (pdfFile.Length > fiveMegabyte || pdfFile.ContentType !=pdfMimeType)
            {
                return BadRequest("File is not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(candidateCreate);
            newCandidate.ResumeUrl = resumeUrl;

            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate have been created successfully");   
        }

        [Authorize(Roles ="Admin")]
        [HttpGet("GetCandidate")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidate ()
        {
            var candidates = await _context.Candidates
                .Include(j => j.Job)
                .ToListAsync();

            var CandidateList = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);

            return Ok(CandidateList);   
        }
        [Authorize(Roles ="Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidate (int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);

            var url = candidate.ResumeUrl;

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File is not found");
            }

            System.IO.File.Delete(filePath);

             _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate has been deleted successfully");
        }

        [Authorize(Roles ="Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CandidateGetDto>> GetCandidateById(int id)
        {
            var candidate = await _context.Candidates
                .Include(j => j.Job)
                .FirstOrDefaultAsync(x => x.Id == id);

            var selectedCandidate = _mapper.Map<CandidateGetDto>(candidate);    

            return Ok(selectedCandidate);
        }

        [HttpGet("download/{url}")]
        public IActionResult DownloadPdfFile (string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("file Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);

            return file;
        }
    }
}
