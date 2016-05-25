export const IS_LOADING = 'IS_LOADING'
export const IS_NOT_LOADING = 'IS_NOT_LOADING'
export const JOINED_ROOM = 'JOINED_ROOM'
export const UPDATE_ROOMS = 'UPDATE_ROOMS'
export const CHANGE_NAME = 'CHANGE_NAME'
export const ERROR = 'ERROR'

import Socket from '../../Socket'

const socket = new Socket()

function joinedRoom() {
  return dispatch => {
    dispatch({ type: IS_NOT_LOADING })
  }
}

function joinRoom(room, player) {
  socket.emit('join room', { room, player })
  return dispatch => {
    dispatch({ type: IS_LOADING })
  }
}

function createNewRoom(creator) {
  socket.emit('create room', { creator })
  return dispatch => {
    dispatch({ type: IS_LOADING })
  }
}

function createNewRoomError(error) {
  return dispatch => {
    dispatch({ type: ERROR, error })
  }
}

function getAvailableRooms() {
  socket.emit('get rooms')
}

function updateAvailableRooms(rooms) {
  return dispatch => {
    dispatch({ type: UPDATE_ROOMS, rooms })
  }
}

function changeName(myName) {
  return dispatch => {
    dispatch({ type: CHANGE_NAME, myName })
  }
}

export {
  createNewRoom,
  joinRoom,
  joinedRoom,
  getAvailableRooms,
  updateAvailableRooms,
  changeName,
  createNewRoomError,
}
