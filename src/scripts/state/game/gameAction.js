export const RECEIVED_GAME = 'RECEIVED_GAME'
export const EXIT_ROOM = 'EXIT_ROOM'

import Socket from '../../Socket'

const socket = new Socket()

function getGameUpdate(id) {
  socket.emit('get game', id)
}

function receivedGame(game) {
  return dispatch => {
    dispatch({
      type: RECEIVED_GAME,
      state: game.state,
      id: game.id,
      creatorNickname: game.creatorNickname,
      gameStarterId: game.gameStarterId,
      players: game.players,
      timestamp: Date.now(),
    })
  }
}

function exitRoom() {
  socket.emit('exit room')
  return dispatch => {
    dispatch({ type: EXIT_ROOM })
  }
}

export {
  receivedGame,
  exitRoom,
  getGameUpdate,
}
