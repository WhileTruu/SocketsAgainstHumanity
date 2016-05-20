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
    socket.on('joined room', (room) => {
      this.props.dispatch(receivedNewRoom(room))
      this.props.dispatch(joinedRoom())
    })
    socket.on('room was created', (room) => {
      this.props.dispatch(receivedNewRoom(room))
      this.props.dispatch(joinedRoom())
    })
    socket.on('player list update', (players) => {
      this.props.dispatch(receivedPlayers(players))
    })
    socket.on('available rooms update', (rooms) => {
      this.props.dispatch(updateAvailableRooms(rooms))
    })
    socket.on('create room error', (data) => {
      console.log('CREATE ROOM ERROR', data)
    })
    socket.on('join room error', (data) => {
      console.log('JOIN ROOM ERROR', data)
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
