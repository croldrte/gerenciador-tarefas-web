using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace tarefas_web.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Color = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: true),
                    IsCompleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsImportant = table.Column<bool>(type: "INTEGER", nullable: false),
                    CategoryId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Name" },
                values: new object[,]
                {
                    { 1, "Pink", "Trabalho" },
                    { 2, "Green", "Estudo" },
                    { 3, "Blue", "Pessoal" },
                    { 4, "Orange", "Casa" }
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "CategoryId", "Date", "Description", "IsCompleted", "IsImportant", "Time", "Title" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 7, 3, 0, 0, 0, 0, DateTimeKind.Local), "Mandar pra Amanda: revisão detalhada dos contratos com fornecedores, ciclos de recebimento, dívidas de curto prazo.", true, true, new TimeSpan(0, 9, 0, 0, 0), "Enviar relatório" },
                    { 2, 2, new DateTime(2025, 7, 2, 0, 0, 0, 0, DateTimeKind.Local), "Oferta e demanda, estruturas de mercado, custo de produção, teorias econômicas. Capítulos 6 a 9.", false, true, new TimeSpan(0, 18, 0, 0, 0), "Prova de economia" },
                    { 3, 3, new DateTime(2025, 7, 1, 0, 0, 0, 0, DateTimeKind.Local), "Pranayama – 5 minutos\r\nCão olhando para baixo – 3 minutos\r\nGato e vaca – 2 minutos\r\nGuerreiro 1 – 2 minutos\r\nGuerreiro 2 – 2 minutos\r\nPostura da criança – 3 minutos\r\nSavasana – 5 minutos", false, false, new TimeSpan(0, 7, 30, 0, 0), "Fazer yoga" },
                    { 4, 4, new DateTime(2025, 7, 4, 0, 0, 0, 0, DateTimeKind.Local), "Arroz\r\nFeijão\r\nMacarrão\r\nAveia\r\nPão integral\r\nLeite\r\nOvos\r\nBanana\r\nMaçã\r\nCenoura\r\nBrócolis\r\nTomate\r\nAlho\r\nCebola\r\nSabonete\r\nShampoo\r\nPasta de dente\r\nPapel higiênico\r\nCafé", false, false, new TimeSpan(0, 20, 0, 0, 0), "Ir ao mercado" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CategoryId",
                table: "Tasks",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
