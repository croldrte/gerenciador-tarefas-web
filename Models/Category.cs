using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class Category
    {
        public int Id { get; set; }

        [StringLength(
            100,
            ErrorMessage = "O nome da categoria não pode ter mais de 100 caracteres."
        )]
        public required string Name { get; set; }

        public required string Color { get; set; }

        public ICollection<TaskItem>? Tasks { get; set; }
    }
}
