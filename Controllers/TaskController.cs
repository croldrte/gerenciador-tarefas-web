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
            var tasks = _context.Tasks
                .Where(t => t.DeletedAt == null)
                .ToList();
            return View(tasks);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Models.Task task)
        {
            if (ModelState.IsValid)
            {
                task.CreatedAt = DateTime.UtcNow;
                _context.Tasks.Add(task);
                _context.SaveChanges();

                var savedTask = _context.Tasks.FirstOrDefault(t => t.Id == task.Id && t.DeletedAt == null);
                if (savedTask == null)
                {
                    return Json(new { success = false, errors = new[] { "A tarefa não foi encontrada após ser salva." } });
                }
                var category = _context.Categories.FirstOrDefault(c => c.Id == savedTask.CategoryId && c.DeletedAt == null);

                return Json(new
                {
                    success = true,
                    task = new
                    {
                        id = savedTask.Id,
                        title = savedTask.Title,
                        description = savedTask.Description,
                        date = savedTask.Date?.ToString("yyyy-MM-dd"),
                        time = savedTask.Time?.ToString(@"hh\:mm"),
                        categoryName = category?.Name ?? "",
                        categoryColor = category != null ? category.Color.ToRGB() : "#000000",
                        isCompleted = savedTask.IsCompleted,
                        isImportant = savedTask.IsImportant,
                        deletedAt = savedTask.DeletedAt
                    }
                });
            }
            return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var task = _context.Tasks
                .Where(t => t.Id == id && t.DeletedAt == null)
                .Select(t => new
                {
                    id = t.Id,
                    title = t.Title,
                    description = t.Description,
                    date = t.Date.HasValue ? t.Date.Value.ToString("yyyy-MM-dd") : "",
                    time = t.Time.HasValue ? t.Time.Value.ToString(@"hh\:mm") : "",
                    categoryId = t.CategoryId,
                    isImportant = t.IsImportant,
                    isCompleted = t.IsCompleted,
                    deletedAt = t.DeletedAt
                })
                .FirstOrDefault();

            if (task == null)
                return NotFound();

            return Json(task);
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Models.Task task)
        {
            var existing = _context.Tasks.FirstOrDefault(t => t.Id == task.Id && t.DeletedAt == null);
            if (existing == null)
                return Json(new { success = false });

            existing.Title = task.Title;
            existing.Description = task.Description;
            existing.Date = task.Date;
            existing.Time = task.Time;
            existing.CategoryId = task.CategoryId;
            existing.UpdatedAt = DateTime.UtcNow;
            _context.SaveChanges();

            var category = _context.Categories.FirstOrDefault(c => c.Id == task.CategoryId && c.DeletedAt == null);

            return Json(new
            {
                success = true,
                task = new
                {
                    id = existing.Id,
                    title = existing.Title,
                    description = existing.Description,
                    date = existing.Date?.ToString("yyyy-MM-dd"),
                    time = existing.Time?.ToString(@"hh\:mm"),
                    categoryName = category?.Name ?? "",
                    categoryColor = category != null ? category.Color.ToRGB() : "#000000",
                    isCompleted = existing.IsCompleted,
                    isImportant = existing.IsImportant,
                    deletedAt = existing.DeletedAt
                }
            });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id && t.DeletedAt == null);
            if (task == null)
                return Json(new { success = false });

            task.DeletedAt = DateTime.UtcNow;
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public IActionResult Done(int id, bool isCompleted)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id && t.DeletedAt == null);
            if (task == null)
                return Json(new { success = false });

            task.IsCompleted = isCompleted;
            _context.SaveChanges();
            return Json(new { success = true });
        }
    }
}
