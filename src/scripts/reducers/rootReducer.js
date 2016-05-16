import { combineReducers } from 'redux'
import cardReducer from '../pages/gamepage/cardReducer'
import startReducer from '../pages/startpage/startReducer'
export default combineReducers(
  {
    cardReducer,
    startReducer,
  }
)
