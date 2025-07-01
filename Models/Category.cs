using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public enum CategoryColor
    {
        Red,
        Green,
        Blue,
        Pink,
        Yellow,
        Purple,
        Orange
    }

    public class Category
    {
        public int Id { get; set; }

        [StringLength(20, ErrorMessage = "O nome da categoria não pode ter mais de 20 caracteres.")]
        public required string Name { get; set; }

        public required string Color { get; set; }

        public ICollection<Task>? Tasks { get; set; }
    }
}
