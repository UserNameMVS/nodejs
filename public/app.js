document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    remove(target.dataset.id).then(() => target.closest('li').remove());
  }

  if (target.dataset.type === 'change') {
    let currentTitle = target.closest('li').firstChild.textContent.trim();
    const newTitle = prompt('Введите новое название', currentTitle);

    if (!newTitle || !newTitle.trim()) return;

    change(target.dataset.id, newTitle.trim()).then(
      () => (target.closest('li').firstChild.textContent = newTitle.trim())
    );
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
