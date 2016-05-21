import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RoomList from '../components/RoomList'

import { getAvailableRooms } from '../state/join/joinAction'

class RoomsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    join: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    getAvailableRooms()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.id !== '' && nextProps.game.timestamp !== this.props.game.timestamp) {
      this.context.router.push({ pathname: `rooms/${nextProps.game.id}` })
    }
  }

  render() {
    const { rooms, myName } = this.props.join
    return (
      <div className="main-container">
        <div className="component-heading">Available Rooms</div>
        <RoomList myName={myName} rooms={rooms} />
      </div>
    )
  }
}

export default connect(value => value)(RoomsPage)
