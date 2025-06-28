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