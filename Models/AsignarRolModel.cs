using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Login.Models
{
    public class AsignarRolModel
    {
        public int UsuarioId { get; set; }
        public int RolId { get; set; }
    }

}
