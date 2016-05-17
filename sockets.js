import {
  getRandomCard,
} from './server/dbActions'
import Game from './server/Game'
import { getRandomName } from './server/utilities'

let games = []
import { cloneDeep } from 'lodash'

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

function createRoom(socket, io) {
  socket.on('create room', (data) => {
    games = []
    const newRoomName = getRandomName()

    console.log(data.nickname, `/#${data.id}`, socket.id)
    const game = new Game(newRoomName, data.nickname, `/#${data.id}`)
    games.push(game)
    // socket.emit('joined room', newRoomName)
    io.to(socket.id).emit('joined room', newRoomName)
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

function getRoomList(socket, io) {
  socket.on('get room list', () => {
    io.emit('room list', cloneDeep(games).map((game) => game.id))
  })
}

function getPlayerList(socket) {
  socket.on('get player list', (data) => {
    console.log(data)
    socket.broadcast.to(`/#${data.socketId}`).emit('player list', games.filter((game) => game.id === data.gameId)[0].players)
  })
}

export function addListenersToSocket(io) {
  io.on('connection', (socket) => {
    // joinRoom(socket)
    createRoom(socket, io)
    joinRoom(socket)
    socketGetRandomCard(socket, io)
    getRoomList(socket, io)
    getPlayerList(socket)
  })
}
