import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RoomList from '../components/RoomList'
import Alert from '../components/Alert'
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
      this.context.router.push({ pathname: `room${nextProps.game.id}` })
    }
  }

  onBackPress() {
    this.context.router.push({ pathname: '/' })
  }

  render() {
    const { rooms, myName } = this.props.join
    return (
      <div className="main-container">
        <div className="row-items-container">
          <div
            className="exit-button"
            type="button"
            onClick={::this.onBackPress}
          >
          <i className="fa fa-chevron-left" />
          <span> back</span>
          </div>
          <div className="component-heading">Rooms</div>
          <div className="width-provider"></div>
        </div>
        {
          rooms.length > 0 ?
          <div>
            <div className="rooms-info-bar">
              <div className="room-item">Room ID</div>
              <div className="room-item">Creator</div>
              <div className="room-item">Players</div>
            </div>
            <RoomList myName={myName} rooms={rooms} />
          </div> :
          <Alert alertType="info" message="No rooms available. You could create one." />
        }
      </div>
    )
  }
}

export default connect(value => value)(RoomsPage)
