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

function sendGameUpdate(socket, io, id) {
  io.to(id).emit('game update', games.filter(game => game.id === id)[0])
}

function onSocketGetRandomCard(socket, io) {
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

function onCreateRoom(socket, io) {
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

    sendGameUpdate(socket, io, newRoomName)
    updateAvailableRooms(io)
  })
}

function onJoinRoom(socket, io) {
  socket.on('join room', (data) => {
    const existingRoom = findPlayerRoom(socket.id)
    if (existingRoom !== null) {
      if (existingRoom === data.room) {
        sendGameUpdate(socket, io, existingRoom)
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
    sendGameUpdate(socket, io, thisGame[0].id)
  })
}

function onGetRoomList(socket, io) {
  socket.on('get rooms', () => {
    updateAvailableRooms(io)
  })
}

function exitRoom(socket, io) {
  const room = findPlayerRoom(socket.id)
  removePlayerFromRoom(socket.id)
  removeEmptyGames()
  socket.leave(room)
  if (games.filter(game => game.id === room).length !== 0) sendGameUpdate(socket, io, room)
  updateAvailableRooms(io)
}

function onExitRoom(socket, io) {
  socket.on('exit room', () => {
    exitRoom(socket, io)
  })
}

function onGetGame(socket, io) {
  socket.on('get game', id => {
    sendGameUpdate(socket, io, id)
  })
}

export function addListenersToSocket(io) {
  io.on('connection', (socket) => {
    onCreateRoom(socket, io)
    onJoinRoom(socket, io)
    onSocketGetRandomCard(socket, io)
    onGetRoomList(socket, io)
    onExitRoom(socket, io)
    onGetGame(socket, io)
    socket.on('disconnect', () => {
      exitRoom(socket, io)
    })
  })
}
