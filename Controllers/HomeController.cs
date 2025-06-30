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
            .AsEnumerable()
            .OrderBy(t => t.Date.HasValue)
            .ThenBy(t => t.Date)
            .ThenBy(t => t.Time)
            .ToList();

        var model = new TaskAndCategoryViewModel
        {
            Tasks = tasks,
            Categories = _context.Categories.ToList()
        };

        return View(model);
    }
}
