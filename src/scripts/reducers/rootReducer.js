import { combineReducers } from 'redux'
import cardReducer from '../pages/gamepage/cardReducer'
import startReducer from '../pages/startpage/startReducer'
import roomsReducer from '../pages/roomspage/roomsReducer'
import singleRoomReducer from '../pages/singleroompage/singleRoomReducer'

export default combineReducers(
  {
    cardReducer,
    startReducer,
    roomsReducer,
    singleRoomReducer,
  }
)
