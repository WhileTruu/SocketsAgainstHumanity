import {
  RECEIVED_ROOM,
  RECEIVED_PLAYERS,
} from './gameAction'

export default function game(state = { room: null, players: [] }, result) {
  switch (result.type) {
    case RECEIVED_ROOM: {
      return {
        room: result.room,
        players: state.players,
      }
    }
    case RECEIVED_PLAYERS: {
      return {
        room: state.room,
        players: result.players,
      }
    }
    default:
      return {
        room: state.room,
        players: state.players,
      }
  }
}
