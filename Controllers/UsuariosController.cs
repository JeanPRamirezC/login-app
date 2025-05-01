using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Login.Data;
using Login.Models;
using Microsoft.AspNetCore.Authorization;  // Asegúrate de importar este espacio de nombres

namespace Login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/usuarios
        [HttpGet]
        [Authorize]  // Agregar [Authorize] para proteger la ruta
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/registros
        [HttpGet("registros")]
        [Authorize]  // Agregar [Authorize] para proteger la ruta
        public async Task<ActionResult<IEnumerable<Registro>>> GetRegistros()
        {
            var registros = await _context.Registros.ToListAsync(); // Obtener todos los registros
            return Ok(registros); // Retornar los registros
        }

        // POST: api/usuarios
        [HttpPost("crearUsuario")]
        [Authorize]  // Agregar [Authorize] para proteger la ruta
        public async Task<ActionResult<Usuario>> CrearUsuario([FromBody] Usuario nuevoUsuario)
        {
            if (nuevoUsuario == null)
            {
                return BadRequest("Datos de usuario inválidos.");
            }

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuarios), new { id = nuevoUsuario.UsuId }, nuevoUsuario);
        }

        // POST: api/registros
        [HttpPost("registro")]
        [Authorize]  // Agregar [Authorize] para proteger la ruta
        public async Task<IActionResult> CrearRegistro([FromBody] Registro nuevoRegistro)
        {
            if (nuevoRegistro == null)
            {
                return BadRequest("Datos inválidos.");
            }

            _context.Registros.Add(nuevoRegistro);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegistros), new { id = nuevoRegistro.RegId }, nuevoRegistro);
        }

        // PUT: api/usuarios/cambiarContrasena
        [HttpPut("cambiarContrasena")]
        [Authorize]  // Agregar [Authorize] para proteger la ruta
        public async Task<IActionResult> CambiarContrasena([FromBody] CambiarContrasenaModel cambiarModel)
        {
            // Validación de los datos
            if (cambiarModel == null || string.IsNullOrEmpty(cambiarModel.Correo) || string.IsNullOrEmpty(cambiarModel.NuevaContrasena) || string.IsNullOrEmpty(cambiarModel.ConfirmarContrasena))
            {
                return BadRequest("Por favor, ingrese todos los datos correctamente.");
            }

            // Verificar que las contraseñas coincidan
            if (cambiarModel.NuevaContrasena != cambiarModel.ConfirmarContrasena)
            {
                return BadRequest("Las contraseñas no coinciden.");
            }

            // Buscar al usuario por correo
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuCorreo == cambiarModel.Correo);

            if (usuario == null)
            {
                return Unauthorized("Correo no encontrado.");
            }

            // Actualizar la contraseña del usuario
            usuario.UsuContrasenia = cambiarModel.NuevaContrasena;

            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Contraseña cambiada con éxito." });
        }
    }
}
