import React, { Component, PropTypes } from 'react'

import { joinRoom } from '../state/join/joinAction'

export default class Room extends Component {
  static propTypes = {
    room: PropTypes.object.isRequired,
    myName: PropTypes.string.isRequired,
  };

  joinRoom() {
    joinRoom(this.props.room.id, this.props.myName)
  }

  render() {
    const { room } = this.props
    return (
      <div
        className="single-room"
        onClick={() => this.joinRoom()}
      >
        <div className="room-item">{room.id}</div>
        <div className="room-item">{room.creator}</div>
        <div className="room-item">{room.playerCount}</div>
      </div>
    )
  }
}
