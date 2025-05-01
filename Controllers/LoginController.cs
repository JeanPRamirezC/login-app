using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Login.Data;
using Login.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.Correo) || string.IsNullOrEmpty(loginModel.Contrasenia))
            {
                return BadRequest("Por favor, ingrese correo y contraseña.");
            }

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.UsuCorreo == loginModel.Correo);

            if (usuario == null)
            {
                return Unauthorized("Correo no encontrado.");
            }

            if (usuario.UsuContrasenia?.Trim() != loginModel.Contrasenia?.Trim())
            {
                return Unauthorized("Contraseña incorrecta.");
            }

            // Generar el token JWT
            var secretKey = _configuration["Jwt:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("La clave secreta JWT no está configurada.");
            }

            var key = Encoding.UTF8.GetBytes(secretKey);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.UsuId.ToString()!),
                    new Claim(ClaimTypes.Name, usuario.UsuCorreo!)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { mensaje = "Inicio de sesión exitoso", token = tokenString });
        }
    }
}
