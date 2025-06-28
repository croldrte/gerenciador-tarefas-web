// Adicionar Tarefa
document.getElementById('btn-add-task').addEventListener('click', function () {
    var modal = new bootstrap.Modal(document.getElementById('modal-add-task'));
    modal.show();
});

document.getElementById('form-add-task').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        Title: form['Title'].value,
        Description: form['Description'].value,
        DateTime: form['DateTime'].value,
        CategoryId: form['CategoryId'].value
    };

    const response = await fetch('/Task/Add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        const col9 = document.querySelector('.col-9');
        const div = document.createElement('div');
        div.className = 'd-flex justify-content-between align-items-center py-4';
        div.innerHTML = `
            <span>${result.task.Title}</span>
            <div class="d-flex gap-5 align-items-center">
                <span>
                    <i class="bi bi-circle-fill" style="color:${result.task.CategoryColor};font-size:18px;"></i>
                    ${result.task.CategoryName}
                </span>
                <span>${result.task.DateTime ? new Date(result.task.DateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                <i class="bi bi-three-dots-vertical" role="button" tabindex="0"></i>
            </div>
        `;
        col9.appendChild(div);

        bootstrap.Modal.getInstance(document.getElementById('modal-add-task')).hide();
        form.reset();
    } else {
        alert('Erro ao adicionar tarefa');
    }
});

document.querySelectorAll('.btn-edit-task').forEach(function(btn) {
    btn.addEventListener('click', async function(e) {
        e.preventDefault();
        const taskId = this.getAttribute('data-task-id');
        const response = await fetch(`/Task/Get/${taskId}`);
        const task = await response.json();

        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('edit-task-title').value = task.title;
        document.getElementById('edit-task-description').value = task.description;
        document.getElementById('edit-task-datetime').value = task.dateTime;
        if (task.categoryId) {
            document.getElementById('edit-cat-' + task.categoryId).checked = true;
        }

        var modal = new bootstrap.Modal(document.getElementById('modal-edit-task'));
        modal.show();
    });
});

// Editar Tarefa
document.getElementById('form-edit-task').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        Id: form['Id'].value,
        Title: form['Title'].value,
        Description: form['Description'].value,
        DateTime: form['DateTime'].value,
        CategoryId: form['CategoryId'].value
    };

    const response = await fetch('/Task/Edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        const taskDiv = document.querySelector(`[data-task-id-div="${result.task.Id}"]`);
        if (taskDiv) {
            taskDiv.querySelector('.task-title').textContent = result.task.Title;
            taskDiv.querySelector('.task-category').innerHTML = `
                <i class="bi bi-circle-fill" style="color:${result.task.CategoryColor};font-size:18px;"></i>
                ${result.task.CategoryName}
            `;
            taskDiv.querySelector('.task-time').textContent = result.task.DateTime
                ? new Date(result.task.DateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                : '';
        }

        bootstrap.Modal.getInstance(document.getElementById('modal-edit-task')).hide();
    } else {
        alert('Erro ao editar tarefa');
    }
});

// Excluir Tarefa
let taskIdToDelete = null;
const modalDelete = new bootstrap.Modal(document.getElementById('modal-confirm-delete'));

document.querySelectorAll('.btn-delete-task').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        taskIdToDelete = this.getAttribute('data-task-id');
        modalDelete.show();
    });
});

document.getElementById('btn-confirm-delete').addEventListener('click', async function() {
    if (!taskIdToDelete) return;
    const response = await fetch(`/Task/Delete/${taskIdToDelete}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
        const taskDiv = document.querySelector(`[data-task-id-div="${taskIdToDelete}"]`);
        if (taskDiv) taskDiv.remove();
        modalDelete.hide();
    } else {
        alert('Erro ao excluir tarefa');
    }
    taskIdToDelete = null;
});