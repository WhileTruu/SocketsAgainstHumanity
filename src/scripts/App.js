import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  receivedGame,
  getMyCards,
} from './state/game/gameAction'
import {
  joinedRoom,
  updateAvailableRooms,
  createNewRoomError,
} from './state/join/joinAction'
import {
  blackCardUpdate,
  whiteCardUpdate,
  evaluationCardsUpdate,
  toggleCardsEvaluated,
} from './state/cards/cardAction'

import Socket from './Socket'

const socket = new Socket()

/* window.onbeforeunload = () => {
  return 'Are you sure you want to leave?'
}*/

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  };

  constructor(props) {
    super(props)
    socket.on('game update', (game) => {
      this.props.dispatch(receivedGame(game))
      this.props.dispatch(joinedRoom())
      if (game.state === 1) {
        getMyCards(game.id)
      }
    })
    socket.on('available rooms update', (rooms) => {
      this.props.dispatch(updateAvailableRooms(rooms))
    })
    socket.on('create room error', (data) => {
      this.props.dispatch(createNewRoomError(data.error))
    })
    socket.on('join room error', (data) => {
      console.log('JOIN ROOM ERROR', data)
    })
    socket.on('game card update', (data) => {
      socket.emit('get my black card', data.blackCard)
      socket.emit('get my white cards', data.whiteCards)
    })
    socket.on('white card text update', (data) => {
      this.props.dispatch(whiteCardUpdate(data))
    })
    socket.on('black card text update', (data) => {
      this.props.dispatch(blackCardUpdate(data))
    })
    socket.on('evaluation cards update', (data) => {
      this.props.dispatch(evaluationCardsUpdate(data))
    })
    socket.on('cards evaluated', () => {
      console.log('Cards have been evaluated.')
      this.props.dispatch(toggleCardsEvaluated())
    })
  }

  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default connect((value) => value)(App)
