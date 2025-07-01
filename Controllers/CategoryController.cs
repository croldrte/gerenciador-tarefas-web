using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;

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
            var categories = _context.Categories.ToList();
            return View(categories);
        }
    }
}
