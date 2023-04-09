const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Ваш список заметок:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
}
async function changeNote(data) {
  const notes = await getNotes();
  const newData = JSON.parse(data);
  const index = notes.findIndex((i) => i.id === newData.id);
  notes[index].title = newData.title;
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  changeNote,
  removeNote,
  getNotes,
};
