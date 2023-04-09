const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "note title",
      demandOption: true,
    },
  },
  async handler({ title }) {
    addNote(title);
  },
});
yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});
yargs.command({
  command: "remove",
  describe: "Remove note from list",
  builder: {
    id: {
      type: "string",
      describe: "note id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await removeNote(id);
  },
});

yargs.parse();
