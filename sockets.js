import {
  getRandomCard,
} from './server/dbActions'
import Game from './server/Game'
import { getRandomName } from './server/utilities'
import { cloneDeep } from 'lodash'

const games = []

function socketGetRandomCard(socket, io) {
  socket.on('get random card', () => {
    console.log(`${socket.id} has asked for a random card`)
    getRandomCard()
      .then((response) => {
        io.emit('get random card', response)
      })
      .catch((error) => {
        io.emit('get random card', error)
      })
  })
}

function updateAvailableRooms(io) {
  io.emit('available rooms', cloneDeep(games).map((game) => ({
    id: game.id,
    playerCount: game.players.length,
    creator: game.creatorNickname,
  })))
}

function updatePlayerListForRoom(room, io) {
  io.to(room).emit('player list', games.filter((game) => game.id === room)[0].players)
}

function createRoom(socket, io) {
  socket.on('create room', (data) => {
    const newRoomName = getRandomName()
    socket.join(newRoomName)

    const game = new Game(newRoomName, data.creator, socket.id)
    games.push(game)

    io.to(newRoomName).emit('room was created', newRoomName)
    updateAvailableRooms(io)
  })
}

function joinRoom(socket, io) {
  socket.on('join room', (data) => {
    const thisGame = games.filter((game) => game.id === data.room)

    if (thisGame.length > 0) {
      thisGame[0].addPlayer(data.player, socket.id)
      socket.join(thisGame[0].id)
      io.to(thisGame[0].id).emit('joined room', thisGame[0].id)
      updatePlayerListForRoom(thisGame[0].id, io)
    }
  })
}

function getRoomList(socket, io) {
  socket.on('get rooms', () => {
    updateAvailableRooms(io)
  })
}

function getPlayerList(socket, io) {
  socket.on('get players', (room) => {
    updatePlayerListForRoom(room, io)
  })
}

export function addListenersToSocket(io) {
  io.on('connection', (socket) => {
    createRoom(socket, io)
    joinRoom(socket, io)
    socketGetRandomCard(socket, io)
    getRoomList(socket, io)
    getPlayerList(socket, io)
  })
}
