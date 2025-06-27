using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(
            100,
            ErrorMessage = "O título da tarefa não pode ter mais de 100 caracteres."
        )]
        public required string Title { get; set; }

        [StringLength(500, ErrorMessage = "A descrição não pode ter mais de 500 caracteres.")]
        public string? Description { get; set; }

        public DateTime? DateTime { get; set; }

        public bool IsCompleted { get; set; }

        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}
