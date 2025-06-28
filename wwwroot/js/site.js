// Adicionar Tarefa
document.getElementById('btn-add-task').addEventListener('click', function () {
    var modal = new bootstrap.Modal(document.getElementById('modal-add-task'));
    modal.show();
});

document.getElementById('form-add-task').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const date = form['Date'].value;
    const time = form['Time'].value;
    let dateTime = null;
    if (date && time) {
        dateTime = `${date}T${time}`;
    } else if (date) {
        dateTime = `${date}`;
    }

    const data = {
        Title: form['Title'].value,
        Description: form['Description'].value,
        DateTime: dateTime,
        CategoryId: form['CategoryId'].value || null
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
        div.className = 'd-flex justify-content-between align-items-center py-4 task-item';
        div.setAttribute('data-task-id-div', result.task.Id);

        let categoryHtml = '';
        if (result.task.CategoryName) {
            categoryHtml = `
                <i class="bi bi-circle-fill" style="color:${result.task.CategoryColor};font-size:18px;"></i>
                ${result.task.CategoryName}
            `;
        }

        div.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <input type="checkbox" class="form-check-input task-check" />
                <span class="task-title">${result.task.Title}</span>
            </div>
            <div class="d-flex gap-5 align-items-center">
                <span class="task-category">
                    ${categoryHtml}
                </span>
                <span class="task-time ${timeClass}">
                    ${timeHtml}
                </span>
                <div class="dropdown">
                    <i class="bi bi-three-dots-vertical" role="button" tabindex="0" data-bs-toggle="dropdown"
                      aria-expanded="false"></i>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item btn-edit-task" href="#" data-task-id="${result.task.Id}">Editar</a>
                      </li>
                      <li>
                        <a class="dropdown-item btn-delete-task" href="#" data-task-id="${result.task.Id}">Excluir</a>
                      </li>
                    </ul>
                </div>
            </div>
        `;
        col9.appendChild(div);

        bootstrap.Modal.getInstance(document.getElementById('modal-add-task')).hide();
        form.reset();
    } else {
        alert('Erro ao adicionar tarefa');
    }
});

document.querySelector('.col-9').addEventListener('click', async function(e) {
    if (e.target.classList.contains('btn-edit-task')) {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-task-id');
        const response = await fetch(`/Task/Get/${taskId}`);
        const task = await response.json();

        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('edit-task-title').value = task.title;
        document.getElementById('edit-task-description').value = task.description;

        // Antes de marcar a categoria, desmarque todas
        document.querySelectorAll('input[name="CategoryId"]').forEach(r => r.checked = false);
        if (task.categoryId) {
            document.getElementById('edit-cat-' + task.categoryId).checked = true;
            document.getElementById('edit-cat-' + task.categoryId).focus();
        }

        if (task.dateTime) {
            const [date, time] = task.dateTime.split('T');
            document.getElementById('edit-task-date').value = date;
            document.getElementById('edit-task-time').value = time || '';
        } else {
            document.getElementById('edit-task-date').value = '';
            document.getElementById('edit-task-time').value = '';
        }

        var modal = new bootstrap.Modal(document.getElementById('modal-edit-task'));
        modal.show();
    }
});

// Editar Tarefa
document.getElementById('form-edit-task').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const date = form['Date'].value;
    const time = form['Time'].value;
    let dateTime = null;
    if (date && time) {
        dateTime = `${date}T${time}`;
    } else if (date) {
        dateTime = `${date}`;
    }

    const data = {
        Id: form['Id'].value,
        Title: form['Title'].value,
        Description: form['Description'].value,
        DateTime: dateTime,
        CategoryId: form['CategoryId'].value || null // <-- aqui!
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

// Marcar Tarefa como Concluída
document.querySelectorAll('.task-check').forEach(function(check) {
    check.addEventListener('change', function() {
        const title = this.closest('.task-item').querySelector('.task-title');
        if (this.checked) {
            title.classList.add('checked');
        } else {
            title.classList.remove('checked');
        }
    });
});

function formatTaskDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffDays = Math.floor((taskDay - today) / (1000 * 60 * 60 * 24));
    const hora = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (diffDays === 0) {
        return `Hoje ${hora}`;
    } else if (diffDays === 1) {
        return `Amanhã ${hora}`;
    } else if (diffDays > 1 && diffDays <= 6) {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        return `${diasSemana[date.getDay()]} ${hora}`;
    } else {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
}

// Desabilitar campo de hora se não houver data
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('task-date');
    const timeInput = document.getElementById('task-time');

    function toggleTimeInput() {
        timeInput.disabled = !dateInput.value;
        if (!dateInput.value) {
            timeInput.value = '';
        }
    }

    if (dateInput && timeInput) {
        dateInput.addEventListener('input', toggleTimeInput);
        // Inicializa o estado ao carregar a página/modal
        toggleTimeInput();
    }
});