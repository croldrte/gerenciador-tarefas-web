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

        [HttpGet]
        public IActionResult Get(int id)
        {
            var task = _context.Tasks
                .Where(t => t.Id == id)
                .Select(t => new {
                    id = t.Id,
                    title = t.Title,
                    description = t.Description,
                    dateTime = t.DateTime.HasValue ? t.DateTime.Value.ToString("yyyy-MM-ddTHH:mm") : "",
                    categoryId = t.CategoryId
                })
                .FirstOrDefault();

            if (task == null)
                return NotFound();

            return Json(task);
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Models.Task task)
        {
            var existing = _context.Tasks.FirstOrDefault(t => t.Id == task.Id);
            if (existing == null)
                return Json(new { success = false });

            existing.Title = task.Title;
            existing.Description = task.Description;
            existing.DateTime = task.DateTime;
            existing.CategoryId = task.CategoryId;
            _context.SaveChanges();

            var category = _context.Categories.FirstOrDefault(c => c.Id == task.CategoryId);

            return Json(new
            {
                success = true,
                task = new
                {
                    existing.Id,
                    existing.Title,
                    existing.Description,
                    existing.DateTime,
                    CategoryName = category?.Name,
                    CategoryColor = category?.Color
                }
            });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return Json(new { success = false });

            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return Json(new { success = true });
        }
    }
}
