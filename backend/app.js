import name from './utils.js'
import { getNotes } from './note.js'
import validator from 'validator'
import chalk from 'chalk'
import yargs from 'yargs'

console.log('Hello Node JS')
console.log(name)
console.log(getNotes())

// Test du validator
let email = "test@example.com"
if (validator.isEmail(email)) {
    console.log('Cet email est valide')
} else {
    console.log('Cet email n\est pas valide')
}

// Utilisation de chalk
console.log(chalk.green.bold.inverse('Succes'))

// Script avec arguments
const command = process.argv[2]

if(command === 'add') {
    console.log('Adding note')
} else if (command === 'remove') {
    console.log('Removing note')
}

yargs.command({
    command: 'add',
    describe: 'Adda new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: true,
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Adding a new note', argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler () {
        console.log('Reading the note')
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler () {
        console.log('Listing out all notes')
    }
})

yargs.parse()