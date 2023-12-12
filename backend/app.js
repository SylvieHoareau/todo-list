// import name from './utils.js'
import { getNotes } from './note.js'
import validator from 'validator'
import chalk from 'chalk'
import yargs from 'yargs'

// Importation du module Express
import express from 'express'
import http from 'http'
import fetch from 'node-fetch'
import axios from 'axios'

// Création d'une nouvelle application Express
const app = express()

// Définition d'une route pour la racine du site
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Pour envoyer du HTML
app.get('/html', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

// Pour envoyer du JSON
app.get('/json', (req, res) => {
    res.json({ message: 'Bonjour Monde'})
})

// Configurer EJS comme moteur de vue
app.set('view engine', 'ejs')

// Configurer le répertoire de vue
app.set('views', path.join(__dirname, 'views'))

// Rendre une vue
app.get('/view', (req, res) => {
    res.render('index', { message: 'Hello World' })
})

http.get('https://api.jikan.moe/v4/anime?q=Dragon Ball Z&sfw', (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk
    })

    res.on('end', () => {
        let animeData = JSON.parse(data)
        console.log(animeData)
    })
}).on('error', (err) => {
    console.log('Error:' + err.message)
})

// Utilisation de fetch
fetch('https://api.jikan.moe/v4/anime?q=Dragon%20Ball%20Z&sfw')
    .then(res => res.json)
    .then(json => console.log(json))
    .catch(err => console.log('Error:', err))

// Utilisation d'AXIOS
const getAnimeData = async () => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/anime?q=Dragon%20Ball%20Z&sfw')
        console.log(response.data)
    } catch (error) {
       console.log(error)
    }
}

getAnimeData()

console.log('Hello Node JS')
// console.log(name)
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
    describe: 'Ajouter une nouvelle note',
    builder: {
        title: {
            describe: 'Titre de la note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Corps de la note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
        console.log('Adding a new note', argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Supprimer une note',
    builder: {
        title: {
            describe: 'Titre de la note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Corps de la note',
            demandOption: true,
            type: 'string'
        }
    },
    handler () {
        removeNote(argv.title)
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



// Fonction pour ajouter une note
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('Nouvelle note ajoutée !'))
    } else {
        console.log(chalk.red('Note déjà existante !'))
    }
}

// Fonction pour supprimer une note
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green('Note supprimée !'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red('Aucune note trouvée !'))
    }
}

// Fonction pour sauvegarder les notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    FileSystem.writeFileSync('notes.json', dataJSON)
}

// Fonction pour charger les notes
const loadNotes = (notes) => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

// Exécuter yargs
yargs.parse()

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})