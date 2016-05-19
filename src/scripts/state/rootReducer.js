import { combineReducers } from 'redux'
import game from './game/gameReducer'
import join from './join/joinReducer'

export default combineReducers({
  join,
  game,
})
