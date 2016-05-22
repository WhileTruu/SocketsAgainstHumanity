import { combineReducers } from 'redux'
import game from './game/gameReducer'
import join from './join/joinReducer'
import cards from './cards/cardReducer'

export default combineReducers({
  join,
  game,
  cards,
})
