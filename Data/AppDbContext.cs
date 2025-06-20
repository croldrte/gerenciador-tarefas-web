using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.Models;

namespace GerenciadorTarefas.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Tarefa> Tarefas { get; set; }
    }
}