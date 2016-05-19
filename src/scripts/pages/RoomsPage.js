import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RoomList from '../components/RoomList'

import { getAvailableRooms } from '../state/join/joinAction'

class RoomsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    join: PropTypes.object.isRequired,
  }

  componentWillMount() {
    getAvailableRooms()
  }

  render() {
    const { rooms } = this.props.join
    return (
      <div className="main-container">
        <div className="component-heading">Available Rooms</div>
        <RoomList rooms={rooms} />
      </div>
    )
  }
}

export default connect(value => value)(RoomsPage)
