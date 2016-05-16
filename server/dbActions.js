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

export {
  getRandomCard,
}
// createDatabase()
// getRandomCard()
