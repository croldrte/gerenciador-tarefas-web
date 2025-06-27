using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Trabalho", Color = "#FF5733" },
                new Category { Id = 2, Name = "Pessoal", Color = "#33FF57" },
                new Category { Id = 3, Name = "Estudo", Color = "#3357FF" },
                new Category { Id = 4, Name = "Saúde", Color = "#FF33A1" }
            );
        }
    }
}