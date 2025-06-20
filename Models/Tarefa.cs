using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        
        public required string Titulo { get; set; }

        public string? Descricao { get; set; }

        public bool Concluida { get; set; }
    }
}