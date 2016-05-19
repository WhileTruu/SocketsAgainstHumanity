import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  receivedNewRoom,
  receivedPlayers,
} from './state/game/gameAction'
import {
  joinedRoom,
  updateAvailableRooms,
} from './state/join/joinAction'
import Socket from './Socket'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  };

  constructor(props) {
    super(props)
    const socket = new Socket()
    socket.on('joined room', (data) => {
      this.props.dispatch(receivedNewRoom(data.room))
      this.props.dispatch(joinedRoom())
    })
    socket.on('room was created', (room) => {
      this.props.dispatch(receivedNewRoom(room))
      this.props.dispatch(joinedRoom())
    })
    socket.on('player list', (players) => {
      this.props.dispatch(receivedPlayers(players))
    })
    socket.on('available rooms', (rooms) => {
      this.props.dispatch(updateAvailableRooms(rooms))
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
