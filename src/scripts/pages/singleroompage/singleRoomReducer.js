import {
  PLAYERS_ARE_NOT_LOADING,
  PLAYERS_ARE_LOADING,
  RECEIVED_PLAYER_LIST,
} from './singleRoomAction'

export default function singleRoomReducer(state = { players: [], isLoading: false }, result) {
  switch (result.type) {
    case RECEIVED_PLAYER_LIST: {
      return {
        players: result.players,
        isLoading: false,
      }
    }
    case PLAYERS_ARE_LOADING: {
      return {
        players: state.players,
        isLoading: true,
      }
    }
    case PLAYERS_ARE_NOT_LOADING: {
      return {
        players: state.players,
        isLoading: false,
      }
    }
    default:
      return {
        players: state.players,
        isLoading: state.isLoading,
      }
  }
}
