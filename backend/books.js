import fs from 'fs'

// Créer l'objet book
const book = {
    title: 'Apprendre node JS',
    author: 'Pierre'
}

// Convertir l'objet en chaîne JSON
const bookJSON = JSON.stringify(book)

// Ecrire la chaîne JSON dans un fichier
fs.writeFile('books.json', bookJSON, (err) => {
    if (err) throw err
    console.log('Le fichier a été sauvegardé !')
})

// Lire le fichier 'books.json'
fs.readFile('books.json', (err, data) => {
    if (err) throw err

    // Convertir les données en chaîne
    const strData = data.toString()

    // Convertir la chaîne en objet JSON
    const book = JSON.parse(strData)

    // Afficher le titre du livre
    console.log('Titre du livre : ', book.title)
})