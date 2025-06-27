// Modal Adicionar Tarefa
document.getElementById('btn-add-task').addEventListener('click', function () {
    var modal = new bootstrap.Modal(document.getElementById('modal-add-task'));
    modal.show();
});

document.getElementById('form-add-task').addEventListener('submit', async function (e) {
    e.preventDefault();

    const tarefa = {
        Titulo: document.getElementById('task-title').value,
        Descricao: document.getElementById('task-description').value,
        Data: document.getElementById('task-datetime').value,
        Categoria: document.getElementById('task-category').value
    };

    const response = await fetch('/Tarefa/Adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    });

    const result = await response.json();
    if (result.sucesso) {
        const col9 = document.querySelector('.col-9');
        const div = document.createElement('div');
        div.className = 'd-flex justify-content-between align-items-center py-4';
        div.innerHTML = `
            <span>${result.tarefa.titulo || result.tarefa.Titulo}</span>
            <div class="d-flex gap-5 align-items-center">
                <span>${result.tarefa.categoria || result.tarefa.Categoria}</span>
                <span>${result.tarefa.data ? new Date(result.tarefa.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                <i class="bi bi-three-dots-vertical" role="button" tabindex="0"></i>
            </div>
        `;
        col9.appendChild(div);

        bootstrap.Modal.getInstance(document.getElementById('modal-add-task')).hide();
        e.target.reset();
    } else {
        alert('Erro ao adicionar tarefa');
    }
});