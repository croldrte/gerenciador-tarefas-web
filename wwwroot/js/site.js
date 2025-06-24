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

// Desabilitar botão de adicionar tarefa se o campo estiver vazio
const inputTask = document.getElementById('input-task');
const btnAddTask = document.getElementById('btn-add-task');

btnAddTask.disabled = true;

inputTask.addEventListener('input', function () {
    btnAddTask.disabled = !inputTask.value.trim();
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

// Riscar tarefas concluídas
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