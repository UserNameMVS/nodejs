const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notePath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  fs.writeFile(notePath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added'));
}

async function getNotes() {
  const notes = await fs.readFile(notePath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(notes);
  console.log('Here is the list of notes:');
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  fs.writeFile(notePath, JSON.stringify(notes.filter((note) => note.id !== id)));
}

async function changeNote(id, title) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  notes[noteIndex] = { ...notes[noteIndex], ...{ title } };
  fs.writeFile(notePath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  changeNote,
};
