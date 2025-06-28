using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.ViewModels;

public class HomeController : Controller
{
    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var tasks = _context.Tasks
            .Include(t => t.Category)
            .OrderByDescending(t => t.DateTime.HasValue)
            .ThenByDescending(t => t.DateTime)
            .ToList();

        var model = new TaskAndCategoryViewModel
        {
            Tasks = tasks,
            Categories = _context.Categories.ToList()
        };

        return View(model);
    }
}
