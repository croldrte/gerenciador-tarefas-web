using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class TaskController : Controller
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var tasks = _context.Tasks.ToList();
            return View(tasks);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Models.Task task)
        {
            if (ModelState.IsValid)
            {
                _context.Tasks.Add(task);
                _context.SaveChanges();

                var category = _context.Categories.FirstOrDefault(c => c.Id == task.CategoryId);
                return Json(new
                {
                    success = true,
                    task = new
                    {
                        task.Id,
                        task.Title,
                        task.Description,
                        task.DateTime,
                        CategoryName = category?.Name,
                        CategoryColor = category?.Color
                    }
                });
            }
            return Json(new { success = false });
        }
    }
}
