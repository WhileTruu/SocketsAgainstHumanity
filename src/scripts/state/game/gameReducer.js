import {
  RECEIVED_ROOM,
  RECEIVED_PLAYERS,
  EXIT_ROOM,
} from './gameAction'

export default function game(state = { room: '', players: [], timestamp: 0 }, result) {
  switch (result.type) {
    case EXIT_ROOM: {
      return {
        room: '',
        players: [],
        timestamp: 0,
      }
    }
    case RECEIVED_ROOM: {
      return {
        room: result.room,
        players: state.players,
        timestamp: result.timestamp,
      }
    }
    case RECEIVED_PLAYERS: {
      return {
        room: state.room,
        players: result.players,
        timestamp: state.timestamp,
      }
    }
    default:
      return {
        room: state.room,
        players: state.players,
        timestamp: state.timestamp,
      }
  }
}
