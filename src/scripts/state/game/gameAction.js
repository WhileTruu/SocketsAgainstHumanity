export const RECEIVED_ROOM = 'JOINED_ROOM'
export const RECEIVED_PLAYERS = 'RECEIVED_PLAYERS'
export const EXIT_ROOM = 'EXIT_ROOM'

import Socket from '../../Socket'

const socket = new Socket()

function receivedNewRoom(room) {
  return dispatch => {
    dispatch({ type: RECEIVED_ROOM, room, timestamp: Date.now() })
  }
}

function getPlayersForRoom(room) {
  socket.emit('get players', room)
}

function receivedPlayers(players) {
  return dispatch => {
    dispatch({ type: RECEIVED_PLAYERS, players })
  }
}

function exitRoom() {
  socket.emit('exit room')
  return dispatch => {
    dispatch({ type: EXIT_ROOM })
  }
}

export {
  receivedNewRoom,
  getPlayersForRoom,
  receivedPlayers,
  exitRoom,
}
