import sqlite3 from 'sqlite3'
import baseCards from './textFiles/Base.json'
const db = new (sqlite3.verbose()).Database('myDatabase.sqlite3')

function createWhiteCardTable(database) {
  database.run('CREATE TABLE white_cards (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)')
}

function createBlackCardTable(database) {
  database.run('CREATE TABLE black_cards (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, pick INT)')
}

function addBlackCards(database, blackCards) {
  const stmt = database.prepare('INSERT INTO black_cards (text, pick) VALUES (?, ?)')
  blackCards.forEach((blackCard) => stmt.run(blackCard.text, blackCard.pick))
  stmt.finalize()
}

function addWhiteCards(database, whiteCards) {
  const stmt = database.prepare('INSERT INTO white_cards (text) VALUES (?)')
  whiteCards.forEach((whiteCard) => stmt.run(whiteCard))
  stmt.finalize()
}

function createDatabase() {
  db.serialize(() => {
    createWhiteCardTable(db)
    createBlackCardTable(db)
    addBlackCards(db, baseCards.blackCards)
    addWhiteCards(db, baseCards.whiteCards)

    db.each('SELECT id, text FROM white_cards', (err, row) => {
      console.log(`${row.id} :  ${row.text}`)
    })
    db.get('SELECT COUNT(id) as penis FROM white_cards', (err, row) => {
      console.log(row)
    })
  })

  db.close()
}

export {
  createDatabase,
  createWhiteCardTable,
  createBlackCardTable,
  addBlackCards,
  addWhiteCards,
}
