using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Models;
using TaskManager.ViewModels;  // Não se esqueça de importar o namespace do ViewModel

public class HomeController : Controller
{
    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var tasks = _context.Tasks.ToList();
        var categories = _context.Categories.ToList();

        var viewModel = new TaskAndCategoryViewModel
        {
            Tasks = tasks,
            Categories = categories
        };

        return View(viewModel);
    }
}
