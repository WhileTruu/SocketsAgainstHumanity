import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import { receivedPlayerList } from './singleRoomAction'
const socket = io()

class SingleRoomPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    singleRoomReducer: PropTypes.object.isRequired,
  }

  // TODO: get the room id here somehow :D
  constructor(props) {
    super(props)
    socket.on('player list', (players) => {
      this.props.dispatch(receivedPlayerList(players, roomId))
    })
  }

  componentWillMount() {
    socket.emit('get player list', socket.id)
  }

  render() {
    console.log(this.props.singleRoomReducer.players)
    return (
      <div className="rooms-page">

      </div>
    )
  }
}

export default connect(value => value)(SingleRoomPage)
