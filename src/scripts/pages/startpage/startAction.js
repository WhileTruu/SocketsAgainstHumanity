export const IS_LOADING = 'IS_LOADING'
export const IS_NOT_LOADING = 'IS_NOT_LOADING'
export const JOINED_ROOM = 'JOINED_ROOM'

function start(results, type) {
  return { type, results }
}

function createRoom(id, nickname, socket) {
  console.log(id, nickname, socket)
  socket.emit('create room', { id, nickname })
  return dispatch => {
    dispatch(start({}, IS_LOADING))
  }
}

function joinRoom(id, roomName, nickname, socket) {
  socket.emit('join room', { id, roomName, nickname })
  return dispatch => {
    dispatch(start({}, IS_LOADING))
  }
}

function joinedRoom(roomName) {
  return dispatch => {
    dispatch(start(roomName, JOINED_ROOM))
  }
}

export {
  createRoom,
  joinRoom,
  joinedRoom,
}
