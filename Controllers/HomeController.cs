using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;
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
            .OrderByDescending(t => t.Date.HasValue)
            .ThenBy(t => t.Date)
            .ThenBy(t => t.Time)
            .ToList();

        var model = new TaskAndCategoryViewModel
        {
            Tasks = tasks,
            Categories = _context.Categories.ToList()
        };

        // Adicione esta linha:
        ViewBag.TasksJson = System.Text.Json.JsonSerializer.Serialize(
            tasks.Select(t => new {
                id = t.Id,
                title = t.Title,
                description = t.Description,
                isCompleted = t.IsCompleted,
                isImportant = t.IsImportant,
                date = t.Date?.ToString("yyyy-MM-dd") ?? "",
                time = t.Time?.ToString(@"hh\:mm") ?? "",
                categoryName = t.Category?.Name ?? "",
                categoryColor = t.Category != null ? t.Category.Color.ToRGB() : "#000000"
            })
        );

        return View(model);
    }
}
