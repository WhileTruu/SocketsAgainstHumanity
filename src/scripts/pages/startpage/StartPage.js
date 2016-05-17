import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createRoom, joinedRoom } from './startAction'

/* TODO:
 * 1. Fix problem with room names being weird
 * 2. Add some validation rules for nickname
 * 3. Make finding a room possible
 */


export default class StartPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    startReducer: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      nickname: '',
    }
    this.props.route.socket.on('joined room', (roomName) => {
      console.log('yolo')
      this.props.dispatch(joinedRoom(roomName))
      this.context.router.push({ pathname: `rooms/${roomName}` })
    })
  }

  onCreateRoom(event) {
    event.preventDefault()
    this.props.dispatch(createRoom(this.props.route.socket.id, this.state.nickname, this.props.route.socket))
  }

  onFindRoom(event) {
    event.preventDefault()
    console.log('I want to join a room.')
  }

  onNameChange(event) {
    this.setState({ nickname: event.target.value })
  }


  render() {
    return (
      <div>
        <div className="create-room-container">
          <div>
            <input
              className="text-input"
              type="text"
              ref="nickname"
              onChange={::this.onNameChange}
              placeholder="enter your nickname"
            />
          </div>
          <div>
            <input
              className="create-room-button"
              type="button"
              onClick={::this.onCreateRoom}
              value="create"
            />
          </div>
          <div>
            <input
              className="join-room-button"
              type="button"
              onClick={::this.onFindRoom}
              value="join"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(StartPage)
