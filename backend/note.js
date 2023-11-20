import fs from 'fs'

export default getNotes = () => {
    try {
        const data = fs.readFileSync('note.txt', 'utf8')
        return data
    } catch (error) {
        console.error(error)
        return ''
    }
}
