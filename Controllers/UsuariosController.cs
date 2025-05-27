using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Login.Data;
using Login.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
        [Authorize]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var userRoleName = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRoleName == "Administrador")
            {
                return await _context.Usuarios
                    .Include(u => u.Registro)
                    .Include(u => u.Rol)
                    .ToListAsync();
            }
            else if (userRoleName == "Empleado")
            {
                var usuario = await _context.Usuarios
                    .Include(u => u.Registro)
                    .Include(u => u.Rol)
                    .Where(u => u.UsuId == userId)
                    .ToListAsync();
                return usuario;
            }
            else
            {
                return Forbid("Usuario sin permisos.");
            }
        }

        // GET: api/usuarios/registros
        [HttpGet("registros")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Registro>>> GetRegistros()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var userRoleName = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRoleName == "Administrador")
            {
                return await _context.Registros.ToListAsync();
            }
            else if (userRoleName == "Empleado")
            {
                var usuario = await _context.Usuarios.FindAsync(userId);
                if (usuario == null || usuario.UsuRegistroId == null)
                    return NotFound();

                var registro = await _context.Registros
                    .Where(r => r.RegId == usuario.UsuRegistroId)
                    .ToListAsync();
                return registro;
            }
            else
            {
                return Forbid("Usuario sin permisos.");
            }
        }

        // POST: api/usuarios/crearUsuario
        [HttpPost("crearUsuario")]
        [Authorize]
        public async Task<ActionResult<Usuario>> CrearUsuario([FromBody] Usuario nuevoUsuario)
        {
            var userRoleName = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRoleName != "Administrador")
                return Forbid("Solo un administrador puede crear usuarios.");

            if (nuevoUsuario == null)
                return BadRequest("Datos de usuario inválidos.");

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuarios), new { id = nuevoUsuario.UsuId }, nuevoUsuario);
        }

        // POST: api/usuarios/registro
        [HttpPost("registro")]
        [Authorize]
        public async Task<IActionResult> CrearRegistro([FromBody] Registro nuevoRegistro)
        {
            if (nuevoRegistro == null)
                return BadRequest("Datos inválidos.");

            _context.Registros.Add(nuevoRegistro);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegistros), new { id = nuevoRegistro.RegId }, nuevoRegistro);
        }

        // POST: api/usuarios/asignarRol
        [HttpPost("asignarRol")]
        [Authorize]
        public async Task<IActionResult> AsignarRol([FromBody] AsignarRolModel model)
        {
            var userRoleName = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRoleName != "Administrador")
                return Forbid("Solo un administrador puede asignar roles.");

            if (model == null || model.UsuarioId == 0 || model.RolId == 0)
                return BadRequest("Datos inválidos.");

            var usuario = await _context.Usuarios.FindAsync(model.UsuarioId);
            if (usuario == null)
                return NotFound("Usuario no encontrado.");

            var rol = await _context.Set<Rol>().FindAsync(model.RolId);
            if (rol == null)
                return BadRequest("El rol especificado no existe.");

            usuario.RolId = model.RolId;
            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = $"Rol asignado correctamente a {usuario.UsuCorreo}." });
        }

        // GET: api/usuarios/roles
        [HttpGet("roles")]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRoles()
        {
            return await _context.Set<Rol>().ToListAsync();
        }

        // PUT: api/usuarios/cambiarContrasena
        [HttpPut("cambiarContrasena")]
        [Authorize]
        public async Task<IActionResult> CambiarContrasena([FromBody] CambiarContrasenaModel cambiarModel)
        {
            if (cambiarModel == null || string.IsNullOrEmpty(cambiarModel.Correo)
                || string.IsNullOrEmpty(cambiarModel.NuevaContrasena)
                || string.IsNullOrEmpty(cambiarModel.ConfirmarContrasena))
                return BadRequest("Por favor, ingrese todos los datos correctamente.");

            if (cambiarModel.NuevaContrasena != cambiarModel.ConfirmarContrasena)
                return BadRequest("Las contraseñas no coinciden.");

            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuCorreo == cambiarModel.Correo);

            if (usuario == null)
                return Unauthorized("Correo no encontrado.");

            usuario.UsuContrasenia = cambiarModel.NuevaContrasena;

            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Contraseña cambiada con éxito." });
        }
    }
}
