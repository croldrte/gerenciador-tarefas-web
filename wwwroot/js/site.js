document.getElementById('btn-add-task').addEventListener('click', function() {
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

document.querySelectorAll('.form-check-input').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
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
            if (!response.ok) alert('Erro ao atualizar tarefa');
        });
    });
});

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

const inputTask = document.getElementById('input-task');
const btnAddTask = document.getElementById('btn-add-task');

btnAddTask.disabled = true;

inputTask.addEventListener('input', function() {
    btnAddTask.disabled = !inputTask.value.trim();
});