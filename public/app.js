document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "change") {
    const id = event.target.dataset.id;
    const newTitle = window.prompt(
      "Введите новое название",
      `${event.target.dataset.title}`
    );
    if (
      newTitle !== null ||
      newTitle.trim().length !== 0 ||
      newTitle.trim() !== event.target.dataset.title
    ) {
      change({ id: id, title: newTitle });
    }
		event.target.closest('li').querySelector('#note-title').textContent = newTitle
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function change(data) {
  await fetch(JSON.stringify(data), {
    method: "PUT",
  });
}
