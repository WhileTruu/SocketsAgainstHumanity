import sqlite3 from 'sqlite3'
const db = new (sqlite3.verbose()).Database('./server/expandedDB.sqlite3')

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
  getBlackCardCount,
  getWhiteCardCount,
  getWhiteCardsById,
  getBlackCardById,
}
