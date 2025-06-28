using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Trabalho", Color = "Red" },
                new Category { Id = 2, Name = "Pessoal", Color = "Green" },
                new Category { Id = 3, Name = "Estudo", Color = "Blue" },
                new Category { Id = 4, Name = "Saúde", Color = "Pink" }
            );
        }
    }
}