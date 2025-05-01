using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class LoginModel
{
    public string? Correo { get; set; }    // Solo se usará correo para el login
    public string? Contrasenia { get; set; }  // La contraseña
}


