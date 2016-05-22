export const BLACK_CARD_UPDATE = 'BLACK_CARD_UPDATE'
export const WHITE_CARD_UPDATE = 'WHITE_CARD_UPDATE'
export const PICKED_CARDS_UPDATE = 'PICKED_CARDS_UPDATE'


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

export {
  whiteCardUpdate,
  blackCardUpdate,
  pickedCardsUpdate,
}
