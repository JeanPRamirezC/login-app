using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Login.Models
{
    [Table("tbl_registro")]
    public class Registro
    {
        [Key]
        [Column("reg_id")]
        public int RegId { get; set; }

        [Column("reg_nombre")]
        public string? RegNombre { get; set; }

        [Column("reg_apellido")]
        public string? RegApellido { get; set; }

        [Column("reg_telefono")]
        public string? RegTelefono { get; set; }

        [Column("reg_estado")]
        public int RegEstado { get; set; } = 1;

        [Column("reg_fechaNacimiento")]
        public string? RegFechaNacimiento { get; set; }

    }
}
