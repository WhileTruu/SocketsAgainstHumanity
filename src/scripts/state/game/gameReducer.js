import {
  EXIT_ROOM,
  RECEIVED_GAME,
} from './gameAction'

/*
 * Game {
 * state: 0,
 * id: 'B15U',
 * creatorNickname: 'marten',
 * gameStarterId: '/#zQ6EOPgdCykLqvpoAAAB',
 * players: [ { id: '/#zQ6EOPgdCykLqvpoAAAB', nickname: 'marten', points: 0 } ] }
 */
export default function game(
  state = {
    state: 0,
    id: '',
    creatorNickname: '',
    gameStarterId: '',
    players: [],
    timestamp: 0 }
  , result) {
  switch (result.type) {
    case EXIT_ROOM: {
      return {
        state: 0,
        id: '',
        creatorNickname: '',
        gameStarterId: '',
        players: [],
        timestamp: 0,
      }
    }
    case RECEIVED_GAME: {
      return {
        state: result.state,
        id: result.id,
        creatorNickname: result.creatorNickname,
        gameStarterId: result.gameStarterId,
        players: result.players,
        timestamp: result.timestamp,
      }
    }
    default:
      return {
        state: state.state,
        id: state.id,
        creatorNickname: state.creatorNickname,
        gameStarterId: state.gameStarterId,
        players: state.players,
        timestamp: state.timestamp,
      }
  }
}
