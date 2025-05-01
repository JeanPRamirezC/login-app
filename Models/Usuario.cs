using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // 🔥 Necesario para usar [Table]

namespace Login.Models
{
    [Table("tbl_usuarios")] // 🔥 Aquí indicamos la tabla real de la base de datos
    public class Usuario
    {
        [Key]
        [Column("usu_id")] // Opcional, pero recomendable
        public int UsuId { get; set; }

        [Column("usu_usuario")] // Opcional, pero recomendable
        public string? UsuUsuario { get; set; }

        [Column("usu_correo")] // Opcional
        public string? UsuCorreo { get; set; }

        [Column("usu_contrasenia")] // Opcional
        public string? UsuContrasenia { get; set; }

        [Column("usu_estado")] // Opcional
        public int UsuEstado { get; set; } = 1;
    }
}
