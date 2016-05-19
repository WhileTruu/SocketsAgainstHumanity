export const RECEIVED_ROOM = 'JOINED_ROOM'
export const RECEIVED_PLAYERS = 'RECEIVED_PLAYERS'

import Socket from '../../Socket'

const socket = new Socket()

function receivedNewRoom(room) {
  return dispatch => {
    dispatch({ type: RECEIVED_ROOM, room })
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

export {
  receivedNewRoom,
  getPlayersForRoom,
  receivedPlayers,
}
