import {
  getWhiteCardsById,
  getBlackCardById,
} from './server/dbActions'
import Game from './server/Game'
import GameCards from './server/GameCards'
import { getRandomName } from './server/utilities'
import { cloneDeep } from 'lodash'

let games = []
const gameCards = {}

function findPlayerRoom(socketId) {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].players.length; j++) {
      if (games[i].players[j].id === socketId) return games[i].id
    }
  }
  return null
}

function getPlayerRoomObject(socketId) {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].players.length; j++) {
      if (games[i].players[j].id === socketId) return games[i]
    }
  }
  return null
}

function removePlayerFromRoom(socketId) {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].players.length; j++) {
      if (games[i].players[j].id === socketId) {
        games[i].players.splice(j, 1)
        const gameCardxxx = gameCards[games[i].id]
        if (gameCardxxx) {
          const gamePlayers = gameCardxxx.players
          for (let k = 0; k < gamePlayers.length; k++) {
            if (gamePlayers[k] === socketId) {
              gamePlayers.splice(k, 1)
            }
          }
        }
        return
      }
    }
  }
}
// TODO: SEE IF THIS HAS MISTAKES
function removeEmptyGames() {
  games = games.filter((game) => {
    if (game.players.length > 0) return true
    delete gameCards[game.id]
    return false
  })
}

function sendGameUpdate(socket, io, id) {
  const thisGame = games.filter(game => game.id === id)[0]
  if (thisGame.players.filter(player => player.id === thisGame.gameStarterId).length === 0) {
    thisGame.gameStarterId = thisGame.players[0].id
  }
  io.to(id).emit('game update', thisGame)
}

function updateAvailableRooms(io) {
  io.emit('available rooms update', cloneDeep(games)
    .map((game) => ({
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
    if (thisGame[0].state > 0) {
      io.to(socket.id).emit('join room error', { error: 'Cannot join an ongoing game' })
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

function sendGameCardUpdate(socket, io, id) {
  io.to(socket.id).emit('game card update', {
    blackCard: gameCards[id].currentBlackCard,
    whiteCards: gameCards[id].players.filter(player => player.id === socket.id)[0].cards,
  })
}

function exitRoom(socket, io) {
  const room = findPlayerRoom(socket.id)
  const playerRoom = getPlayerRoomObject(socket.id)
  if (playerRoom && playerRoom.state === 2) {
    playerRoom.state = 1
    gameCards[room].resetEvaluationCards()
    playerRoom.nextEvaluator()
    gameCards[room].updatePlayerCards()
      .then(() => {
        // TODO: I think i know the problem. It's the countrer
        sendGameUpdate(socket, io, room)
        sendGameCardUpdate(socket, io, room)
        io.to(room).emit('cards evaluated')
      })
      .catch(error => console.log(error))
  }
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

function onStartGame(socket, io) {
  socket.on('start game', id => {
    games.filter(game => game.id === id)[0].state = 1
    gameCards[id] = new GameCards(id, 459, 89)
    gameCards[id].addPlayers(games.filter(game => game.id === id)[0].players)
    gameCards[id].updatePlayerCards()
      .then(() => {
        sendGameUpdate(socket, io, id)
      })
      .catch((str) => console.log(str))
  })
}

function onSubmitCardsForEvaluation(socket, io) {
  socket.on('submit cards', cards => {
    const room = findPlayerRoom(socket.id)
    const playerRoom = getPlayerRoomObject(socket.id)
    playerRoom.state = 2
    gameCards[room]
      .updateEvaluationCards(socket.id, cards)
      .then(() => {
        sendGameUpdate(socket, io, room)
        io.to(room).emit('evaluation cards update', gameCards[room].evaluationCards)
      })
      .catch(error => console.log(error))
    // console.log(gameCards[findPlayerRoom(socket.id)])
  })
}

function onGetGameCardUpdate(socket, io) {
  socket.on('get game card update', (id) => {
    sendGameCardUpdate(socket, io, id)
  })
}

function onGetMyCards(socket, io) {
  socket.on('get my white cards', (cardIdList) => {
    getWhiteCardsById(cardIdList)
      .then(result => io.to(socket.id).emit('white card text update', result))
      .catch(error => console.log(error))
  })
  socket.on('get my black card', (cardId) => {
    getBlackCardById(cardId)
      .then(result => io.to(socket.id).emit('black card text update', result))
      .catch(error => console.log(error))
  })
}

function onAddPointToPlayer(socket, io) {
  socket.on('add point', player => {
    console.log('received add point')
    const room = getPlayerRoomObject(socket.id)
    room.state = 1
    room.addPoint(player)
    gameCards[room.id].resetEvaluationCards()
    room.nextEvaluator()
    gameCards[room.id].updatePlayerCards()
      .then(() => {
        // TODO: I think i know the problem. It's the countrer
        sendGameUpdate(socket, io, room.id)
        sendGameCardUpdate(socket, io, room.id)
        io.to(room.id).emit('cards evaluated')
      })
      .catch(error => console.log(error))
  })
}

export function addListenersToSocket(io) {
  io.on('connection', (socket) => {
    onCreateRoom(socket, io)
    onJoinRoom(socket, io)
    onGetRoomList(socket, io)
    onExitRoom(socket, io)
    onGetGame(socket, io)
    onStartGame(socket, io)
    onGetMyCards(socket, io)
    onGetGameCardUpdate(socket, io)
    onSubmitCardsForEvaluation(socket, io)
    // TODO: MAKE SURE ADDPOINTSTUFF IS TOLERAb`l
    onAddPointToPlayer(socket, io)
    socket.on('disconnect', () => {
      if (findPlayerRoom(socket.id)) exitRoom(socket, io)
      console.log(Object.keys(gameCards).length)
    })
  })
}

// Array.from(Array(100).keys()).map((num) => num + 1)
