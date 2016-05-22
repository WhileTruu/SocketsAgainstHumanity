import sqlite3 from 'sqlite3'
const db = new (sqlite3.verbose()).Database('./server/myDatabase.sqlite3')
// const db = new (sqlite3.verbose()).Database('./myDatabase.sqlite3')

function getRandomCard() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(id) as count FROM white_cards', (err, row) => {
      if (err === null) {
        const card = Math.floor(Math.random() * row.count)
        db.get(`SELECT * FROM white_cards WHERE id = ${card}`, (err2, row2) => {
          if (err2 === null) {
            resolve(row2)
          } else {
            reject(row2)
          }
        })
      } else {
        reject(err)
      }
    })
  })
}

function getWhiteCardCount() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(id) as count FROM white_cards', (err, row) => {
      if (err === null) {
        resolve(row.count)
      } else {
        reject(err)
      }
    })
  })
}

function getBlackCardCount() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(id) as count FROM black_cards', (err, row) => {
      if (err === null) {
        resolve(row.count)
      } else {
        reject(err)
      }
    })
  })
}

function getWhiteCardsById(cardIds) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM white_cards WHERE id IN (${cardIds.join(', ')})`, (err, rows) => {
      if (err === null) {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  })
}

function getBlackCardById(cardId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM black_cards WHERE id = ${cardId}`, (err, row) => {
      if (err === null) {
        resolve(row)
      } else {
        reject(err)
      }
    })
  })
}

export {
  getRandomCard,
  getBlackCardCount,
  getWhiteCardCount,
  getWhiteCardsById,
  getBlackCardById,
}
// createDatabase()
// getRandomCard()
