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
            .Where(t => t.DeletedAt == null)
            .AsEnumerable()
            .OrderBy(t => t.Date == null)
            .ThenBy(t => t.Date)
            .ThenBy(t => t.Time == null)
            .ThenBy(t => t.Time)
            .ToList();

        var tasksForJs = tasks
            .Select(t => new
            {
                id = t.Id,
                title = t.Title,
                description = t.Description,
                date = t.Date.HasValue ? t.Date.Value.ToString("yyyy-MM-dd") : "",
                time = t.Time.HasValue ? t.Time.Value.ToString(@"hh\:mm") : "",
                categoryName = t.Category != null && t.Category.DeletedAt == null ? t.Category.Name : "",
                categoryColor = t.Category != null && t.Category.DeletedAt == null ? t.Category.Color.ToRGB() : "#000000",
                isCompleted = t.IsCompleted,
                isImportant = t.IsImportant,
                deletedAt = t.DeletedAt
            })
            .ToList();

        var categories = _context.Categories
            .Where(c => c.DeletedAt == null)
            .ToList();

        ViewBag.TasksJson = System.Text.Json.JsonSerializer.Serialize(tasksForJs);

        var viewModel = new TaskAndCategoryViewModel
        {
            Tasks = tasks,
            Categories = categories
        };

        return View(viewModel);
    }
}
