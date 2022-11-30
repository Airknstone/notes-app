const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

import Notes from './server/models/notes-model';
import Definition from './server/models/dictionary.model';
const CONN = 'mongodb://127.0.0.1:27017/Notes_app';
let note: typeof Notes;
let definition: typeof Definition;
mongoose
  .connect(CONN)
  .then(() => {
    console.log(chalk.bgBlue('Connection to database was successful'));

    if (process.argv[ 2 ] === 'i') {
      note = JSON.parse(
        fs.readFileSync(`${__dirname}/server/_data/notes.json`, 'utf-8').toString(),
      );
      importData();
    } if (process.argv[ 2 ] === 'd') {
      deleteData();
    } else if (process.argv[ 2 ] === 'e') {
      definition = JSON.parse(
        fs.readFileSync(`${__dirname}/server/_data/csvjson.json`, 'utf-8').toString(),
      );
      importDictionary();
    }
  })
  .catch((err: any) => {
    console.log(chalk.red(`MongoDB Error: ${err}`));
  });

//Read file


//Import into DB
const importData = async () => {
  try {

    await Notes.create(note);
    console.log(chalk.bgMagentaBright('Data Imported...'));
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

/* Delete database data */
const deleteData = async () => {
  try {
    await Notes.deleteMany();
    console.log(chalk.bgRed('Data Destroyed...'));
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

/* Import Dictionary */
const importDictionary = async () => {
  try {
    await Definition.create(definition);
    console.log(chalk.bgMagentaBright('Data Imported...'));
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

/* seeds database with json document
Use:
node seeder.js i
or
node seeder.js d */

if (process.argv[ 2 ] === 'i') {
  importData();
} if (process.argv[ 2 ] === 'd') {
  deleteData();
}
else if (process.argv[ 2 ] === 'e') {
  importDictionary();
}
