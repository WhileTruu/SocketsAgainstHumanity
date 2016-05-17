export const ROOMS_ARE_LOADING = 'ROOMS_ARE_LOADING'
export const ROOMS_ARE_NOT_LOADING = 'ROOMS_ARE_NOT_LOADING'
export const RECEIVED_ROOM_LIST = 'RECEIVED_ROOM_LIST'

function receivedRoomList(rooms) {
  return dispatch => {
    dispatch({ type: RECEIVED_ROOM_LIST, results: rooms })
  }
}

export {
  receivedRoomList,
}
