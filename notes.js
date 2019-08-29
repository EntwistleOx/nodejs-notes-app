const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    // filter look throught every single item in array
    // const duplicateNotes = notes.filter((note) => note.title === title) 
    // find return the firts find if any
    const duplicateNote = notes.find((note) => note.title === title) 
    // if (duplicateNotes.length === 0) {

    debugger

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen.black('New note added'))
    } else {
        console.log(chalk.bgRed('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('Note not found!'))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const findedNote = notes.find((note) => note.title === title)
    if(findedNote){
        console.log(chalk.blue.inverse(findedNote.title))
        console.log(findedNote.body)
    }else{
        console.log(chalk.bgRed('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {   
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}