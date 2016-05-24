export const BLACK_CARD_UPDATE = 'BLACK_CARD_UPDATE'
export const WHITE_CARD_UPDATE = 'WHITE_CARD_UPDATE'
export const PICKED_CARDS_UPDATE = 'PICKED_CARDS_UPDATE'
export const EVALUATION_CARDS_UPDATE = 'EVALUATION_CARDS_UPDATE'
export const TOGGLE_CARDS_EVALUATED = 'TOGGLE_CARDS_EVALUATED'


import Socket from '../../Socket'

const socket = new Socket()

function whiteCardUpdate(whiteCards) {
  return dispatch => {
    dispatch({ type: WHITE_CARD_UPDATE, whiteCards })
  }
}

function blackCardUpdate(blackCard) {
  return dispatch => {
    dispatch({ type: BLACK_CARD_UPDATE, blackCard })
  }
}

function pickedCardsUpdate(pickedCards) {
  return dispatch => {
    dispatch({ type: PICKED_CARDS_UPDATE, pickedCards })
  }
}

function submitCardsForEvaluation(cards) {
  socket.emit('submit cards', cards)
}

function evaluationCardsUpdate(evaluationCards) {
  return dispatch => {
    dispatch({ type: EVALUATION_CARDS_UPDATE, evaluationCards })
  }
}

function toggleCardsEvaluated() {
  return dispatch => {
    dispatch({ type: TOGGLE_CARDS_EVALUATED })
  }
}

function addPoint(playerId) {
  console.log('addingpoint')
  socket.emit('add point', playerId)
}


export {
  whiteCardUpdate,
  blackCardUpdate,
  pickedCardsUpdate,
  submitCardsForEvaluation,
  evaluationCardsUpdate,
  toggleCardsEvaluated,
  addPoint,
}
