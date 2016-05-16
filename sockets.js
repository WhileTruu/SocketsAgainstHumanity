import {
  getRandomCard,
} from './server/dbActions'
import Game from './server/Game'
import { getRandomName } from './server/utilities'

const games = []

function socketGetRandomCard(socket, io) {
  socket.on('get random card', () => {
    getRandomCard()
      .then((response) => {
        io.emit('get random card', response)
      })
      .catch((error) => {
        io.emit('get random card', error)
      })
  })
}

function createRoom(socket) {
  socket.on('create room', (data) => {
    const newRoomName = getRandomName()
    console.log(socket.id, data.id, data.nickname)

    const game = new Game(newRoomName, data.nickname, `/#${data.id}`)
    games.push(game)

    socket.broadcast.to(`/#${data.id}`).emit('joined room', newRoomName)
    console.log(games[0])
  })
}

function joinRoom(socket) {
  socket.on('join room', (data) => {
    const thisGame = games.filter((game) => game.id === data.roomName)
    if (thisGame.length > 0) {
      thisGame[0].addPlayer(data.nickname, `/#${data.id}`)
      socket.broadcast.to(`/#${data.id}`).emit('joined room', thisGame.id)
    }
    console.log(games[0])
  })
}

export function addListenersToSocket(io) {
  io.on('connection', (socket) => {
    // joinRoom(socket)
    createRoom(socket)
    joinRoom(socket)
    socketGetRandomCard(socket, io)
  })
}
