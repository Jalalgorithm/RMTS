using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RMTS.ApiModel.User;
using RMTS.Data;
using RMTS.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RMTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AccountController( ApplicationDbContext context , IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register( UserCreateDto userCreate)
        {
            var emailcheck = await _context.Users.CountAsync(u=>u.Email == userCreate.Email);

            if (emailcheck > 0)
                return BadRequest();

            var passwordHasher = new PasswordHasher<User>();

            var encryptPassword = passwordHasher.HashPassword(new User() , userCreate.Password);

            var user = new User()
            {
                FirstName = userCreate.FirstName,
                LastName = userCreate.LastName,
                Password = encryptPassword,
                Role = "Client",
                Email = userCreate.Email,
                CreatedAt = DateTime.Now,
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok("Account Created Successfully");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserAccessDto userAccess)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userAccess.Email);

            if (user is null)
                return BadRequest();

            var passwordHasher = new PasswordHasher<User>();
            var confirmPassword = passwordHasher.VerifyHashedPassword(new User() , user.Password , userAccess.Password);

            if(confirmPassword== PasswordVerificationResult.Failed)
                return BadRequest();

            var jwt = CreateJwt(user);

            var responses = new
            {
                Token = jwt
            };

            return Ok(responses);

        }



        private string CreateJwt(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id" ,"" + user.Id),
                new Claim("role" , user.Role),

            };

            string strKey = _configuration["JwtSettings:Key"]!;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(strKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(

                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }
    }
}
