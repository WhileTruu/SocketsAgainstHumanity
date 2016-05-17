export const PLAYERS_ARE_LOADING = 'PLAYERS_ARE_LOADING'
export const PLAYERS_ARE_NOT_LOADING = 'PLAYERS_ARE_NOT_LOADING'
export const RECEIVED_PLAYER_LIST = 'RECEIVED_PLAYER_LIST'

function receivedPlayerList(players) {
  return dispatch => {
    dispatch({ type: RECEIVED_PLAYER_LIST, players })
  }
}

export {
  receivedPlayerList,
}
