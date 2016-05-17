import io from 'socket.io-client'

export const CARD_IS_LOADING = 'CARD_IS_LOADING'
export const CARD_IS_NOT_LOADING = 'CARD_IS_NOT_LOADING'
export const RANDOM_CARD = 'RANDOM_CARD'

const socket = io()

function getCard(results, type) {
  return { type, results }
}

function getRandomCard() {
  socket.emit('get random card')
  return dispatch => {
    dispatch(getCard({}, CARD_IS_LOADING))
  }
}

function retrievedRandomCard(message) {
  return dispatch => {
    dispatch(getCard(message, RANDOM_CARD))
  }
}

export {
  getRandomCard,
  retrievedRandomCard,
}
