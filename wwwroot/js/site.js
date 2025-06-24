// Carregar tarefas
async function carregarTarefas() {
    const response = await fetch('/Tarefa/Listar');
    const tarefas = await response.json();
    const lista = document.getElementById('tasks');
    lista.innerHTML = '';
    tarefas.forEach(t => criarTarefaNoDOM(t.id, t.titulo, t.concluida));

    // Esconde a lista se não houver tarefas, mostra se houver
    lista.style.display = tarefas.length === 0 ? 'none' : '';
}

// Adicionar tarefa
function adicionarTarefa(event) {
    if (event) event.preventDefault();
    const titulo = document.getElementById('input-task').value;
    if (!titulo.trim()) return;

    fetch('/Tarefa/Adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value
        },
        body: JSON.stringify({ titulo })
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('input-task').value = '';
                btnAddTask.disabled = true;
                carregarTarefas();
            } else alert('Erro ao adicionar tarefa');
        });
}

document.getElementById('btn-add-task').addEventListener('click', adicionarTarefa);

document.getElementById('input-task').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        adicionarTarefa();
    }
});

const inputTask = document.getElementById('input-task');
const btnAddTask = document.getElementById('btn-add-task');

btnAddTask.disabled = true;

inputTask.addEventListener('input', function () {
    btnAddTask.disabled = !inputTask.value.trim();
});

// Atualizar tarefa
function atualizarTarefaHandler() {
    const id = this.getAttribute('data-id');
    const concluida = this.checked;
    fetch('/Tarefa/Atualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value
        },
        body: JSON.stringify({ id, concluida })
    }).then(response => {
        if (response.ok) {
            carregarTarefas();
        } else alert('Erro ao atualizar tarefa');
    });
}

function checkboxKeydownHandler(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        this.checked = !this.checked;
        this.dispatchEvent(new Event('change'));
    }
}

document.querySelectorAll('.form-check-input').forEach(function (checkbox) {
    checkbox.addEventListener('change', atualizarTarefaHandler);
    checkbox.addEventListener('keydown', checkboxKeydownHandler);
});

// Excluir tarefa
function excluirTarefaHandler() {
    const id = this.getAttribute('data-id');
    fetch('/Tarefa/Excluir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value
        },
        body: JSON.stringify({ id })
    }).then(response => {
        if (response.ok) {
            carregarTarefas();
        } else alert('Erro ao excluir tarefa');
    });
}

function excluirKeydownHandler(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        this.click();
    }
}

document.querySelectorAll('.bi-x').forEach(el => {
    el.addEventListener('click', excluirTarefaHandler);
    el.addEventListener('keydown', excluirKeydownHandler);
});

function criarTarefaNoDOM(id, titulo, concluida) {
    const lista = document.getElementById('tasks');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    checkbox.setAttribute('data-id', id);
    checkbox.checked = concluida;

    const span = document.createElement('span');
    span.className = 'task-title';
    span.textContent = titulo;
    if (concluida) span.classList.add('checked');

    const btnExcluir = document.createElement('i');
    btnExcluir.className = 'bi bi-x ms-auto';
    btnExcluir.setAttribute('tabindex', '0');
    btnExcluir.setAttribute('data-id', id);
    btnExcluir.setAttribute('role', 'button');

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnExcluir);
    lista.appendChild(li);

    checkbox.addEventListener('change', atualizarTarefaHandler);
    checkbox.addEventListener('keydown', checkboxKeydownHandler);
    btnExcluir.addEventListener('click', excluirTarefaHandler);
    btnExcluir.addEventListener('keydown', excluirKeydownHandler);
}

window.addEventListener('DOMContentLoaded', carregarTarefas);

// Ativar ou desativar tema escuro
const body = document.body;
const btn = document.getElementById('toggle-theme');

btn.addEventListener('click', () => {
    btn.classList.remove('pulse');

    void btn.offsetWidth;

    btn.classList.add('pulse');
});

function updateBtn() {
    if (body.classList.contains("dark-mode")) {
        btn.classList.remove("bi-sun-fill");
        btn.classList.add("bi-moon-fill");
    } else {
        btn.classList.remove("bi-moon-fill");
        btn.classList.add("bi-sun-fill");
    }
}

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

updateBtn();

btn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateBtn();
});

btn.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        btn.click();
    }
});