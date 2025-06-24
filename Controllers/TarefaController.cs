using Microsoft.AspNetCore.Mvc;
using GerenciadorTarefas.Data;
using GerenciadorTarefas.Models;

namespace GerenciadorTarefas.Controllers
{
    public class TarefaController : Controller
    {
        private readonly AppDbContext _context;

        public TarefaController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var tarefas = _context.Tarefas.ToList();
            return View(tarefas);
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody] AdicionarDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Titulo) || dto.Titulo.Length > 50)
                return BadRequest();

            var tarefa = new Tarefa { Titulo = dto.Titulo, Concluida = false };
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Json(new { id = tarefa.Id });
        }

        public class AdicionarDto
        {
            public required string Titulo { get; set; }
        }

        [HttpPost]
        public IActionResult Atualizar([FromBody] AtualizarDto dto)
        {
            var tarefa = _context.Tarefas.Find(dto.Id);
            if (tarefa == null) return NotFound();
            tarefa.Concluida = dto.Concluida;
            _context.SaveChanges();
            return Ok();
        }

        public class AtualizarDto
        {
            public int Id { get; set; }
            public bool Concluida { get; set; }
        }

        [HttpPost]
        public IActionResult Excluir([FromBody] ExcluirDto dto)
        {
            var tarefa = _context.Tarefas.Find(dto.Id);
            if (tarefa == null) return NotFound();
            _context.Tarefas.Remove(tarefa);
            _context.SaveChanges();
            return Ok();
        }

        public class ExcluirDto
        {
            public int Id { get; set; }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            var tarefas = _context.Tarefas
                .Select(t => new { id = t.Id, titulo = t.Titulo, concluida = t.Concluida })
                .ToList();
            return Json(tarefas);
        }
    }
}