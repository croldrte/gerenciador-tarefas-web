using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class CategoryController : Controller
    {
        private readonly AppDbContext _context;
        private static readonly string[] AvailableColors = new string[]
        {
            "Red",
            "Green",
            "Blue",
            "Pink",
            "Yellow",
            "Purple",
            "Orange"
        };

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var categories = _context.Categories
                .Where(c => c.DeletedAt == null)
                .ToList();
            return View(categories);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Category category)
        {
            if (ModelState.IsValid)
            {
                category.CreatedAt = DateTime.UtcNow;
                _context.Categories.Add(category);
                _context.SaveChanges();
                return Json(new { success = true, category });
            }
            return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Category category)
        {
            var existing = _context.Categories.FirstOrDefault(c => c.Id == category.Id && c.DeletedAt == null);
            if (existing == null)
                return Json(new { success = false });

            existing.Name = category.Name;
            existing.Color = category.Color;
            existing.UpdatedAt = DateTime.UtcNow;
            _context.SaveChanges();

            return Json(new { success = true, category = existing });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id && c.DeletedAt == null);
            if (category == null)
                return Json(new { success = false });

            category.DeletedAt = DateTime.UtcNow;
            _context.SaveChanges();
            return Json(new { success = true });
        }
    }
}
