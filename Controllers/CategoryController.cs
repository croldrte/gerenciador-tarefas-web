using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;

namespace TaskManager.Controllers
{
    public class CategoryController : Controller
    {
        private readonly AppDbContext _context;

        private static readonly string[] AvailableColors = new string[]
        {
            "#FF5733", // Vermelho
            "#33FF57", // Verde
            "#3357FF", // Azul
            "#FF33A8", // Rosa
            "#F0E68C", // Amarelo
            "#8A2BE2", // Roxo
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
