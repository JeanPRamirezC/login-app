using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Login.Models
{
    [Table("tbl_usuarios")]
    public class Usuario
    {
        [Key]
        [Column("usu_id")]
        public int UsuId { get; set; }

        [Column("usu_usuario")]
        public string? UsuUsuario { get; set; }

        [Column("usu_correo")]
        public string? UsuCorreo { get; set; }

        [Column("usu_contrasenia")]
        public string? UsuContrasenia { get; set; }

        [Column("usu_estado")]
        public int? UsuEstado { get; set; }

        [Column("rol_id")]
        public int? RolId { get; set; }    // Nuevo campo para rol

        [Column("usu_registro_id")]
        public int? UsuRegistroId { get; set; } // Nuevo campo para relación registro

        // Navegación para EF Core (recomendado)
        [ForeignKey("RolId")]
        public Rol? Rol { get; set; }

        [ForeignKey("UsuRegistroId")]
        public Registro? Registro { get; set; }
    }
}
