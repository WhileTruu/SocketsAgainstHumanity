import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { receivedPlayerList } from './singleRoomAction'

class SingleRoomPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    singleRoomReducer: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  // TODO: get the room id here somehow :D
  constructor(props) {
    super(props)
    this.props.route.socket.on('player list', (players) => {
      console.log('got player list')
      this.props.dispatch(receivedPlayerList(players, this.props.params.id))
    })
  }

  componentWillMount() {
    this.props.route.socket.emit('get player list', { socketId: this.props.route.socket.id, gameId: this.props.params.id })
  }

  render() {
    return (
      <div className="rooms-page">

      </div>
    )
  }
}

export default connect(value => value)(SingleRoomPage)
