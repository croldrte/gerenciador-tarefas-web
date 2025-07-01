using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        [StringLength(
            50,
            ErrorMessage = "O título da tarefa não pode ter mais de 50 caracteres."
        )]
        public required string Title { get; set; }

        [StringLength(500, ErrorMessage = "A descrição da tarefa não pode ter mais de 500 caracteres.")]
        public string? Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Date { get; set; }

        [DataType(DataType.Time)]
        public TimeSpan? Time { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsImportant { get; set; }

        public int? CategoryId { get; set; }

        public Category? Category { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
