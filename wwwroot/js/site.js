const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Mudar Tema
function applyTheme(theme) {
    body.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
        toggleBtn.classList.remove('bi-sun');
        toggleBtn.classList.add('bi-moon');
    } else {
        toggleBtn.classList.remove('bi-moon');
        toggleBtn.classList.add('bi-sun');
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme(prefersDark ? 'dark' : 'light');
}

toggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});


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

document.getElementById('tasks').addEventListener('click', async function (e) {
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
        } else {
            icon.classList.add('bi-star');
            btn.title = "Marcar como importante";
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

document.getElementById('tasks').addEventListener('change', async function (e) {
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
                isImportant: result.task.isImportant,
                deletedAt: result.task.deletedAt
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

document.getElementById('btn-confirm-delete').addEventListener('click', async function () {
    if (!taskIdToDelete) return;
    const response = await fetch(`/Task/Delete/${taskIdToDelete}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
        window.initialTasks = window.initialTasks.filter(t => t.id != taskIdToDelete);
        renderTasks(window.initialTasks);
        modalDelete.hide();
    } else {
        alert('Erro ao excluir tarefa');
    }
    taskIdToDelete = null;
});

function renderTasks(tasks) {
    const filtered = tasks.filter(t => !t.deletedAt);
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';
    filtered.forEach((task, i) => {
        const isLast = i === filtered.length - 1;
        const borderClass = isLast ? '' : 'border-bottom';

        let dateClass = "";
        if (task.date) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const taskDay = new Date(task.date);
            taskDay.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((taskDay - today) / (1000 * 60 * 60 * 24));
            if (diffDays < 0 && !task.isCompleted) {
                dateClass = "text-danger";
            } else if ((diffDays === 0 || diffDays === 1) && !task.isCompleted) {
                dateClass = "text-success";
            }
        }

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
                                <div class="task-datetime">
                                    <i class="bi bi-calendar-event me-1 ${dateClass}"></i>
                                    <span class="task-time ${dateClass}">${formatTaskDate(task.date, task.time)}</span>
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
    const hora = timeStr ? timeStr.substring(0, 5) : "";
    const sep = hora ? ", " : "";

    if (diffDays === 0)
        return `Hoje${sep}${hora}`;
    else if (diffDays === 1)
        return `Amanhã${sep}${hora}`;
    else if (diffDays === -1)
        return `Ontem${sep}${hora}`;
    else if (diffDays === -2)
        return `Anteontem${sep}${hora}`;
    else if (diffDays > 1 && diffDays <= 6)
        return `${diasSemana[date.getDay()]}${sep}${hora}`;
    else {
        let month = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
        return `${date.getDate().toString().padStart(2, '0')} ${month}${sep}${hora}`;
    }
}

function addCategoryFilterListeners() {
    document.querySelectorAll('.filter-category').forEach(elem => {
        elem.addEventListener('click', function () {
            const catName = this.querySelector('span').textContent.trim();
            filterTasks(t => t.categoryName === catName);
            setActiveFilter(this);
        });
    });
}

function setupCategorySelection(modalId, inputPrefix = '') {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.querySelectorAll(`.btn-check[name="CategoryId"]`).forEach(radio => {
        radio.addEventListener('change', function () {
            modal.querySelectorAll('.filter').forEach(label => label.classList.remove('active'));
            const label = modal.querySelector(`label[for="${this.id}"]`);
            if (label) label.classList.add('active');
        });
    });

    modal.addEventListener('show.bs.modal', function () {
        setTimeout(() => {
            modal.querySelectorAll('.filter').forEach(label => label.classList.remove('active'));
            const checked = modal.querySelector(`.btn-check[name="CategoryId"]:checked`);
            if (checked) {
                const label = modal.querySelector(`label[for="${checked.id}"]`);
                if (label) label.classList.add('active');
            }
        }, 10);
    });
}

setupCategorySelection('modal-add-task');
setupCategorySelection('modal-edit-task');

document.addEventListener('DOMContentLoaded', function () {
    renderTasks(window.initialTasks);
    addCategoryFilterListeners();
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
});

function filterTasks(predicate) {
    renderTasks(window.initialTasks.filter(predicate));
}

document.querySelectorAll('.filter-important').forEach(el => {
    el.addEventListener('click', function () {
        filterTasks(t => t.isImportant);
        setActiveFilter(this);
    });
});

document.querySelectorAll('.filter-late').forEach(el => {
    el.addEventListener('click', function () {
        const now = new Date();
        filterTasks(t => t.date && new Date(t.date) < new Date(now.getFullYear(), now.getMonth(), now.getDate()) && !t.isCompleted);
        setActiveFilter(this);
    });
});

document.querySelectorAll('.filter-week').forEach(el => {
    el.addEventListener('click', function () {
        const now = new Date();
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);

        filterTasks(t => {
            if (!t.date) return false;
            const taskDate = new Date(t.date);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate >= start && taskDate < end;
        });
        setActiveFilter(this);
    });
});

document.querySelectorAll('.filter-done').forEach(el => {
    el.addEventListener('click', function () {
        filterTasks(t => t.isCompleted);
        setActiveFilter(this);
    });
});

function setActiveFilter(activeElem) {
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
    activeElem.classList.add('active');
}

document.querySelector('.navbar-brand').addEventListener('click', function () {
    renderTasks(window.initialTasks);
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
});

document.addEventListener("DOMContentLoaded", function () {
    const offcanvas = document.getElementById("filtersOffcanvas");

    const filterButtons = offcanvas.querySelectorAll("[role='button']");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });
});

document.getElementById('tasks').addEventListener('click', function (e) {
    if (
        e.target.closest('.btn-edit-task') ||
        e.target.closest('.btn-delete-task') ||
        e.target.closest('.dropdown') ||
        e.target.closest('.dropdown-menu') ||
        e.target.classList.contains('task-check')
    ) return;

    const taskDiv = e.target.closest('.task-item');
    if (taskDiv) {
        const taskId = taskDiv.getAttribute('data-task-id-div');
        const task = window.initialTasks.find(t => t.id == taskId);
        if (task) {
            showTaskDetails(task);
        }
    }
});

// Detalhes da Tarefa
function showTaskDetails(task) {
    const modal = new bootstrap.Modal(document.getElementById('modal-task-details'));
    document.getElementById('details-title').textContent = task.title;

    const description = task.description ? task.description.replace(/\n/g, '<br>') : '-';
    document.getElementById('details-description').innerHTML = description;

    document.getElementById('details-date').textContent = task.date ? formatTaskDate(task.date, task.time) : '-';
    document.getElementById('details-important').style.display = task.isImportant ? 'inline' : 'none';

    if (task.categoryName && task.categoryColor) {
        document.getElementById('details-category').innerHTML =
            `<span class="badge" style="background-color:rgba(${task.categoryColor},.25);color:rgb(${task.categoryColor})">${task.categoryName}</span>`;
    } else {
        document.getElementById('details-category').innerHTML = '-';
    }

    modal.show();
}