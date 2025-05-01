using Microsoft.EntityFrameworkCore;
using Login.Models;

namespace Login.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Registro> Registros { get; set; }
    }
}
