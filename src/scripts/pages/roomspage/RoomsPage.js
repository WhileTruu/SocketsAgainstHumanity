import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import RoomList from '../../components/RoomList'
import { receivedRoomList } from './roomsAction'
const socket = io()

class RoomsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    roomsReducer: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    socket.on('room list', (rooms) => {
      this.props.dispatch(receivedRoomList(rooms))
    })
    console.log(this.props)
  }

  componentWillMount() {
    socket.emit('get room list')
  }

  render() {
    return (
      <div className="rooms-page">
        <RoomList rooms={this.props.roomsReducer.results} />
      </div>
    )
  }
}

export default connect(value => value)(RoomsPage)
