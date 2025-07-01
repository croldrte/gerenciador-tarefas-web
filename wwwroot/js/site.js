let isImportant = false;
let editIsImportant = false;

// Marcar como Importante
document.getElementById('button-important').addEventListener('click', function () {
    isImportant = !isImportant;
    const icon = this.querySelector('i');
    if (isImportant) {
        icon.classList.remove('bi-star');
        icon.classList.add('bi-star-fill');
        this.title = "Desmarcar como importante";
    } else {
        icon.classList.remove('bi-star-fill');
        icon.classList.add('bi-star');
        this.title = "Marcar como importante";
    }
});

document.getElementById('btn-add-task').addEventListener('click', function () {
    isImportant = false;
    const btn = document.getElementById('button-important');
    const icon = btn.querySelector('i');
    icon.classList.remove('bi-star-fill');
    icon.classList.add('bi-star');
    btn.title = "Marcar como importante";
});

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
        Date: form['Date'].value || null,
        Time: form['Time'].value || null,
        CategoryId: form['CategoryId'].value || null,
        IsImportant: isImportant
    };

    const response = await fetch('/Task/Add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById('modal-add-task')).hide();
        form.reset();
        isImportant = false;
        window.initialTasks.push(result.task);
        renderTasks(window.initialTasks);
    } else {
        alert('Erro ao adicionar tarefa.');
    }
});

document.getElementById('tasks').addEventListener('click', async function(e) {
    if (e.target.classList.contains('btn-edit-task')) {
        e.preventDefault();
        const taskId = e.target.getAttribute('data-task-id');
        const response = await fetch(`/Task/Get/${taskId}`);
        const task = await response.json();

        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('edit-task-title').value = task.title;
        document.getElementById('edit-task-description').value = task.description;

        document.querySelectorAll('input[name="CategoryId"]').forEach(r => r.checked = false);
        if (task.categoryId) {
            document.getElementById('edit-cat-' + task.categoryId).checked = true;
            document.getElementById('edit-cat-' + task.categoryId).focus();
        }

        if (task.date) {
            document.getElementById('edit-task-date').value = task.date;
            document.getElementById('edit-task-time').value = task.time || '';
        } else {
            document.getElementById('edit-task-date').value = '';
            document.getElementById('edit-task-time').value = '';
        }

        if (task.isImportant) {
            editIsImportant = true;
        } else {
            editIsImportant = false;
        }
        const btn = document.getElementById('edit-button-important');
        const icon = btn.querySelector('i');
        icon.className = 'bi';
        if (editIsImportant) {
            icon.classList.add('bi-star-fill');
            btn.title = "Desmarcar como importante";
            document.getElementById('edit-task-isimportant').value = "true";
        } else {
            icon.classList.add('bi-star');
            btn.title = "Marcar como importante";
            document.getElementById('edit-task-isimportant').value = "false";
        }

        var modal = new bootstrap.Modal(document.getElementById('modal-edit-task'));
        modal.show();
    }

    if (e.target.classList.contains('btn-delete-task')) {
        e.preventDefault();
        taskIdToDelete = e.target.getAttribute('data-task-id');
        modalDelete.show();
    }
});

document.getElementById('tasks').addEventListener('change', async function(e) {
    if (e.target.classList.contains('task-check')) {
        const taskDiv = e.target.closest('.task-item');
        const taskId = taskDiv.getAttribute('data-task-id-div');
        const isCompleted = e.target.checked;

        const title = taskDiv.querySelector('.task-title');
        if (isCompleted) {
            title.classList.add('checked');
        } else {
            title.classList.remove('checked');
        }

        await fetch('/Task/Done', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${taskId}&isCompleted=${isCompleted}`
        });

        const idx = window.initialTasks.findIndex(t => t.id == taskId);
        if (idx !== -1) window.initialTasks[idx].isCompleted = isCompleted;
    }
});

// Editar Tarefa
document.getElementById('form-edit-task').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const date = form['Date'].value;
    const time = form['Time'].value;

    const data = {
        Id: form['Id'].value,
        Title: form['Title'].value,
        Description: form['Description'].value,
        Date: date || null,
        Time: time || null,
        CategoryId: form['CategoryId'].value || null,
        IsImportant: editIsImportant
    };

    const response = await fetch('/Task/Edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        // Atualize a tarefa no array
        const idx = window.initialTasks.findIndex(t => t.id == result.task.id);
        if (idx !== -1) {
            window.initialTasks[idx] = {
                ...window.initialTasks[idx],
                id: result.task.id,
                title: result.task.title,
                description: result.task.description,
                date: result.task.date,
                time: result.task.time,
                categoryName: result.task.categoryName,
                categoryColor: result.task.categoryColor,
                isCompleted: result.task.isCompleted,
                isImportant: result.task.isImportant
            };
            renderTasks(window.initialTasks);
        }
        bootstrap.Modal.getInstance(document.getElementById('modal-edit-task')).hide();
    } else {
        alert('Erro ao editar tarefa');
    }
});

// Excluir Tarefa
let taskIdToDelete = null;
const modalDelete = new bootstrap.Modal(document.getElementById('modal-confirm-delete'));

document.getElementById('btn-confirm-delete').addEventListener('click', async function() {
    if (!taskIdToDelete) return;
    const response = await fetch(`/Task/Delete/${taskIdToDelete}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
        // Remova do array
        window.initialTasks = window.initialTasks.filter(t => t.id != taskIdToDelete);
        renderTasks(window.initialTasks);
        modalDelete.hide();
    } else {
        alert('Erro ao excluir tarefa');
    }
    taskIdToDelete = null;
});

function renderTasks(tasks) {
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';
    tasks.forEach((task, i) => {
        const isLast = i === tasks.length - 1;
        const borderClass = isLast ? '' : 'border-bottom';
        tasksDiv.innerHTML += `
        <div class="task-row">
            <div class="task-item py-4 ${borderClass}" data-task-id-div="${task.id}">
                <div class="d-flex align-items-center gap-3">
                    <input type="checkbox" class="form-check-input task-check" ${task.isCompleted ? "checked" : ""} />
                    <span class="task-title${task.isCompleted ? " checked" : ""}">
                        ${task.isImportant ? "<i class='bi bi-star-fill me-1'></i>" : ""}
                        ${task.title}
                    </span>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex justify-content-between align-items-center w-100" style="margin-left: 44px;">
                        <div class="d-flex w-100 justify-content-between align-items-center">
                            <div>
                                ${task.date ? `
                                <div class="task-datetime${(new Date(task.date).toDateString() === new Date().toDateString()) ? " text-primary" : ""}">
                                    <i class="bi bi-calendar-event me-1"></i>
                                    <span class="task-time">${formatTaskDate(task.date, task.time)}</span>
                                </div>` : ''}
                            </div>
                            <div>
                                ${task.categoryName ? `
                                <div class="task-category mx-3">
                                    <span class="badge"
                                        style="background-color:rgba(${task.categoryColor}, .25);color:rgb(${task.categoryColor})">${task.categoryName}</span>
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="dropdown">
                        <i class="bi bi-three-dots-vertical" role="button" tabindex="0" data-bs-toggle="dropdown"
                            aria-expanded="false"></i>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item btn-edit-task" href="#" data-task-id="${task.id}">Editar</a>
                            </li>
                            <li>
                                <a class="dropdown-item btn-delete-task" href="#" data-task-id="${task.id}">Excluir</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}

function formatTaskDate(dateStr, timeStr) {
    if (!dateStr) return "";
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const date = new Date(dateStr + (timeStr ? 'T' + timeStr : ''));
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((taskDay - today) / (1000 * 60 * 60 * 24));
    const hora = timeStr ? timeStr.substring(0,5) : "";
    const sep = hora ? ", " : "";

    if (diffDays === 0)
        return `Hoje${sep}${hora}`;
    else if (diffDays === 1)
        return `Amanhã${sep}${hora}`;
    else if (diffDays > 1 && diffDays <= 6)
        return `${diasSemana[date.getDay()]}${sep}${hora}`;
    else {
        let month = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
        return `${date.getDate().toString().padStart(2, '0')} ${month}${sep}${hora}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderTasks(window.initialTasks);
});

document.getElementById('edit-button-important').addEventListener('click', function () {
    editIsImportant = !editIsImportant;
    const icon = this.querySelector('i');
    if (editIsImportant) {
        icon.classList.remove('bi-star');
        icon.classList.add('bi-star-fill');
        this.title = "Desmarcar como importante";
    } else {
        icon.classList.remove('bi-star-fill');
        icon.classList.add('bi-star');
        this.title = "Marcar como importante";
    }
    document.getElementById('edit-task-isimportant').value = editIsImportant;
});