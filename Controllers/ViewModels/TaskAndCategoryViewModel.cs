using TaskManager.Models;

namespace TaskManager.ViewModels
{
    public class TaskAndCategoryViewModel
    {
        public required List<Models.Task> Tasks { get; set; }
        public required List<Category> Categories { get; set; }
    }
}