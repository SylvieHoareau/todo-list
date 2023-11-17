import name from './utils.js'
import { getNotes } from './note.js'
import validator from 'validator'

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
