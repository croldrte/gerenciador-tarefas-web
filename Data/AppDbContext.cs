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
                new Category { Id = 1, Name = "Trabalho", Color = "Pink" },
                new Category { Id = 2, Name = "Estudo", Color = "Green" },
                new Category { Id = 3, Name = "Pessoal", Color = "Blue" },
                new Category { Id = 4, Name = "Casa", Color = "Orange" }
            );

            modelBuilder.Entity<Models.Task>().HasData(
                new Models.Task
                {
                    Id = 1,
                    Title = "Enviar relatório",
                    Description = "Mandar pra Amanda: revisão detalhada dos contratos com fornecedores, ciclos de recebimento, dívidas de curto prazo.",
                    Date = new DateTime(2025, 7, 11),
                    Time = new TimeSpan(9, 0, 0),
                    IsCompleted = true,
                    IsImportant = true,
                    CategoryId = 1,
                    CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0)
                },
                new Models.Task
                {
                    Id = 2,
                    Title = "Prova de economia",
                    Description = "Oferta e demanda, estruturas de mercado, custo de produção, teorias econômicas. Capítulos 6 a 9.",
                    Date = new DateTime(2025, 7, 10),
                    Time = new TimeSpan(18, 0, 0),
                    IsCompleted = false,
                    IsImportant = false,
                    CategoryId = 2,
                    CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0)
                },
                new Models.Task
                {
                    Id = 3,
                    Title = "Fazer yoga",
                    Description = "Pranayama – 5 minutos\r\nCão olhando para baixo – 3 minutos\r\nGato e vaca – 2 minutos\r\nGuerreiro 1 – 2 minutos\r\nGuerreiro 2 – 2 minutos\r\nPostura da criança – 3 minutos\r\nSavasana – 5 minutos",
                    Date = new DateTime(2025, 7, 9),
                    Time = new TimeSpan(7, 30, 0),
                    IsCompleted = false,
                    IsImportant = false,
                    CategoryId = 3,
                    CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0)
                },
                new Models.Task
                {
                    Id = 4,
                    Title = "Ir ao mercado",
                    Description = "Arroz\r\nFeijão\r\nMacarrão\r\nAveia\r\nPão integral\r\nLeite\r\nOvos\r\nBanana\r\nMaçã\r\nCenoura\r\nBrócolis\r\nTomate\r\nAlho\r\nCebola\r\nSabonete\r\nShampoo\r\nPasta de dente\r\nPapel higiênico\r\nCafé",
                    Date = new DateTime(2025, 7, 8),
                    Time = new TimeSpan(20, 0, 0),
                    IsCompleted = false,
                    IsImportant = false,
                    CategoryId = 4,
                    CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0)
                },
                new Models.Task
                {
                    Id = 5,
                    Title = "Enviar o TCC para revisão",
                    Description = "Keynes, oferta e demanda, política fiscal. Formatar referências. E-mail: juvenal@universidade.com.",
                    Date = new DateTime(2025, 7, 16),
                    Time = new TimeSpan(23, 0, 0),
                    IsCompleted = false,
                    IsImportant = true,
                    CategoryId = 2,
                    CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0)
                }
            );
        }
    }
}