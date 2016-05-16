import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import { createRoom, joinRoom, joinedRoom } from './startAction'

const socket = io()

export default class StartPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    startReducer: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    socket.on('joined room', (roomName) => {
      this.props.dispatch(joinedRoom(roomName))
      this.context.router.push(`rooms/${roomName}`)
    })
  }

  onCreateRoom(event) {
    event.preventDefault()
    console.log(socket.id)
    this.props.dispatch(createRoom(socket.id, this.refs.nickname.value))
    console.log(this)
  }

  onJoinRoom(event) {
    event.preventDefault()
    console.log(socket.id)
    this.props.dispatch(joinRoom(socket.id, this.refs.room.value, this.refs.nickname.value))
  }


  render() {
    console.log(this.props.startReducer)
    return (
      <div>
        <div className="create-room-container">
          <form onSubmit={::this.onCreateRoom}>
            <input
              className="text-input"
              type="text"
              ref="nickname"
              placeholder="enter your nickname"
            />
            <input
              className="create-room-button"
              type="submit"
              ref="createRoom"
              value="create"
            />
          </form>
        </div>
        'cabbage'
        <div className="join-room-container">
          <form onSubmit={::this.onJoinRoom}>
            <input
              className="text-input"
              type="text"
              ref="room"
              placeholder="enter room id"
            />
            <input
              className="join-room-button"
              type="submit"
              ref="joinRoom"
              value="join"
            />
          </form>
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(StartPage)
