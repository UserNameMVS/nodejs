document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'update') {
    let currentTitle = target.closest('li').firstChild.textContent.trim();
    target.closest('li').innerHTML = `

            <input type="text" value="${currentTitle}" data-current="${currentTitle}" />
            <div>
              <button class="btn btn-success" data-type="save" data-id="${target.dataset.id}">Сохранить</button>
              <button class="btn btn-danger" data-type="cancel" data-id="${target.dataset.id}">Отменить</button>
            </div>
          `;
  }
  if (target.dataset.type === 'remove') {
    remove(target.dataset.id).then(() => target.closest('li').remove());
  }

  if (target.dataset.type === 'save') {
    const input = target.closest('li').querySelector('input');

    const newTitle = input.value;

    change(target.dataset.id, newTitle).then(() => {
      target.closest('li').innerHTML = `
            ${newTitle}
            <div>
              <button class="btn btn-primary" data-type="update" data-id="${target.dataset.id}">
                Обновить
              </button>
              <button class="btn btn-danger" data-type="remove" data-id="${target.dataset.id}">
                &times;
              </button>
            </div>
          `;
    });
  }

  if (target.dataset.type === 'cancel') {
    const title = target.closest('li').querySelector('input').dataset.current
    target.closest('li').innerHTML = `
            ${title}
            <div>
              <button class="btn btn-primary" data-type="update" data-id="${target.dataset.id}">
                Обновить
              </button>
              <button class="btn btn-danger" data-type="remove" data-id="${target.dataset.id}">
                &times;
              </button>
            </div>
          `;
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function change(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
