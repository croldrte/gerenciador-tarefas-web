using TaskManager.Models;

namespace TaskManager.ViewModels
{
    public class TaskAndCategoryViewModel
    {
        public required List<TaskItem> Tasks { get; set; }
        public required List<Category> Categories { get; set; }
    }
}