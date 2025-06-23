// Adicionar tarefa
document.getElementById('btn-add-task').addEventListener('click', function () {
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
});