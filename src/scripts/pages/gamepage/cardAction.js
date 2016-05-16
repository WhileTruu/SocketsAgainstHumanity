import io from 'socket.io-client'

export const IS_LOADING = 'IS_LOADING'
export const IS_NOT_LOADING = 'IS_NOT_LOADING'
export const RANDOM_CARD = 'RANDOM_CARD'

const socket = io()

function getCard(results, type) {
  return { type, results }
}

function getRandomCard() {
  socket.emit('get random card')
  return dispatch => {
    dispatch(getCard({}, IS_LOADING))
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
