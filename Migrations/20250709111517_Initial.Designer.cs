﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TaskManager.Data;

#nullable disable

namespace tarefas_web.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250709111517_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.6");

            modelBuilder.Entity("TaskManager.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Color = "Pink",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Trabalho"
                        },
                        new
                        {
                            Id = 2,
                            Color = "Green",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Estudo"
                        },
                        new
                        {
                            Id = 3,
                            Color = "Blue",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Pessoal"
                        },
                        new
                        {
                            Id = 4,
                            Color = "Orange",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Casa"
                        });
                });

            modelBuilder.Entity("TaskManager.Models.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasMaxLength(500)
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsImportant")
                        .HasColumnType("INTEGER");

                    b.Property<TimeSpan?>("Time")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Tasks");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = 1,
                            CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0, 0, DateTimeKind.Unspecified),
                            Date = new DateTime(2025, 7, 11, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mandar pra Amanda: revisão detalhada dos contratos com fornecedores, ciclos de recebimento, dívidas de curto prazo.",
                            IsCompleted = true,
                            IsImportant = true,
                            Time = new TimeSpan(0, 9, 0, 0, 0),
                            Title = "Enviar relatório"
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 2,
                            CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0, 0, DateTimeKind.Unspecified),
                            Date = new DateTime(2025, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Oferta e demanda, estruturas de mercado, custo de produção, teorias econômicas. Capítulos 6 a 9.",
                            IsCompleted = false,
                            IsImportant = false,
                            Time = new TimeSpan(0, 18, 0, 0, 0),
                            Title = "Prova de economia"
                        },
                        new
                        {
                            Id = 3,
                            CategoryId = 3,
                            CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0, 0, DateTimeKind.Unspecified),
                            Date = new DateTime(2025, 7, 9, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Pranayama – 5 minutos\r\nCão olhando para baixo – 3 minutos\r\nGato e vaca – 2 minutos\r\nGuerreiro 1 – 2 minutos\r\nGuerreiro 2 – 2 minutos\r\nPostura da criança – 3 minutos\r\nSavasana – 5 minutos",
                            IsCompleted = false,
                            IsImportant = false,
                            Time = new TimeSpan(0, 7, 30, 0, 0),
                            Title = "Fazer yoga"
                        },
                        new
                        {
                            Id = 4,
                            CategoryId = 4,
                            CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0, 0, DateTimeKind.Unspecified),
                            Date = new DateTime(2025, 7, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Arroz\r\nFeijão\r\nMacarrão\r\nAveia\r\nPão integral\r\nLeite\r\nOvos\r\nBanana\r\nMaçã\r\nCenoura\r\nBrócolis\r\nTomate\r\nAlho\r\nCebola\r\nSabonete\r\nShampoo\r\nPasta de dente\r\nPapel higiênico\r\nCafé",
                            IsCompleted = false,
                            IsImportant = false,
                            Time = new TimeSpan(0, 20, 0, 0, 0),
                            Title = "Ir ao mercado"
                        },
                        new
                        {
                            Id = 5,
                            CategoryId = 2,
                            CreatedAt = new DateTime(2025, 7, 9, 8, 0, 0, 0, DateTimeKind.Unspecified),
                            Date = new DateTime(2025, 7, 16, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Keynes, oferta e demanda, política fiscal. Formatar referências. E-mail: juvenal@universidade.com.",
                            IsCompleted = false,
                            IsImportant = true,
                            Time = new TimeSpan(0, 23, 0, 0, 0),
                            Title = "Enviar o TCC para revisão"
                        });
                });

            modelBuilder.Entity("TaskManager.Models.Task", b =>
                {
                    b.HasOne("TaskManager.Models.Category", "Category")
                        .WithMany("Tasks")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("TaskManager.Models.Category", b =>
                {
                    b.Navigation("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
