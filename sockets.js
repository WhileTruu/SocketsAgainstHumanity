import {
  getRandomCard,
} from './server/dbActions'
import Game from './server/Game'
import { getRandomName } from './server/utilities'
import { cloneDeep } from 'lodash'

let games = []

function findPlayerRoom(socketId) {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].players.length; j++) {
      if (games[i].players[j].id === socketId) return games[i].id
    }
  }
  return null
}

function removePlayerFromRoom(socketId) {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].players.length; j++) {
      if (games[i].players[j].id === socketId) {
        games[i].players.splice(j, 1)
        return
      }
    }
  }
}

function removeEmptyGames() {
  games = games.filter((game) => game.players.length > 0)
}

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
  io.emit('available rooms update', cloneDeep(games).map((game) => ({
    id: game.id,
    playerCount: game.players.length,
    creator: game.creatorNickname,
  })))
}

function updatePlayerListForRoom(room, io) {
  io.to(room).emit('player list update', cloneDeep(games).filter((game) => game.id === room)[0].players)
}

function createRoom(socket, io) {
  socket.on('create room', (data) => {
    const existingRoom = findPlayerRoom(socket.id)
    if (existingRoom !== null) {
      io.to(socket.id).emit('create room error', { error: 'You are already in a room.' })
      return
    }

    const newRoomName = getRandomName()
    socket.join(newRoomName)

    const game = new Game(newRoomName, data.creator, socket.id)
    games.push(game)

    io.to(socket.id).emit('room was created', newRoomName)
    updateAvailableRooms(io)
  })
}

function joinRoom(socket, io) {
  socket.on('join room', (data) => {
    const existingRoom = findPlayerRoom(socket.id)
    if (existingRoom !== null) {
      if (existingRoom === data.room) {
        io.to(socket.id).emit('joined room', existingRoom)
      } else {
        io.to(socket.id).emit('join room error', { error: 'You are already in another room.' })
      }
      return
    }

    const thisGame = games.filter((game) => game.id === data.room)

    if (thisGame.length <= 0) {
      io.to(socket.id).emit('join room error', { error: 'This room does not exist anymore' })
      return
    }
    thisGame[0].addPlayer(data.player, socket.id)
    socket.join(thisGame[0].id)
    io.to(socket.id).emit('joined room', thisGame[0].id)
    updatePlayerListForRoom(thisGame[0].id, io)
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

function exitRoom(socket, io) {
  socket.on('exit room', () => {
    const room = findPlayerRoom(socket.id)
    removePlayerFromRoom(socket.id)
    removeEmptyGames()
    socket.leave(room)
    if (games.filter(game => game.id === room).length !== 0) updatePlayerListForRoom(room, io)
    updateAvailableRooms(io)
  })
}

export function addListenersToSocket(io) {
  io.on('connection', (socket) => {
    createRoom(socket, io)
    joinRoom(socket, io)
    socketGetRandomCard(socket, io)
    getRoomList(socket, io)
    getPlayerList(socket, io)
    exitRoom(socket, io)
  })
}
