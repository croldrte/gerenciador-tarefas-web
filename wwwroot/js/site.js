// Ativar ou desativar o tema escuro
const body = document.body;
const icon = document.getElementById("toggle-theme");

function updateIcon() {
    if (body.classList.contains("dark-mode")) {
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
    } else {
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
    }
}

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

updateIcon();

icon.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateIcon();
});

icon.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        icon.click();
    }
});

// Adicionar tarefa
function adicionarTarefa() {
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
            if (response.ok) location.reload();
            else alert('Erro ao adicionar tarefa');
        });
}

document.getElementById('btn-add-task').addEventListener('click', adicionarTarefa);

document.getElementById('input-task').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        adicionarTarefa();
    }
});

// Atualizar tarefa
document.querySelectorAll('.form-check-input').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
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
            if (response.ok) location.reload();
            else alert('Erro ao atualizar tarefa');
        });
    });

    checkbox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            this.checked = !this.checked;
            this.dispatchEvent(new Event('change'));
        }
    });
});

// Estilizar tarefas concluídas
const checkboxes = document.querySelectorAll('.form-check-input');

checkboxes.forEach(chk => {
    chk.addEventListener('change', () => {
        const text = chk.nextElementSibling;
        if (chk.checked) {
            text.classList.add('checked');
        } else {
            text.classList.remove('checked');
        }
    });
});

// Desabilitar botão de adicionar tarefa se o campo estiver vazio
const inputTask = document.getElementById('input-task');
const btnAddTask = document.getElementById('btn-add-task');

btnAddTask.disabled = true;

inputTask.addEventListener('input', function () {
    btnAddTask.disabled = !inputTask.value.trim();
});

// Excluir tarefa
document.querySelectorAll('.bi-x').forEach(el => {
    el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        fetch('/Tarefa/Excluir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value
            },
            body: JSON.stringify({ id })
        }).then(response => {
            if (response.ok) location.reload();
            else alert('Erro ao excluir tarefa');
        });
    });

    el.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            el.click();
        }
    });
});