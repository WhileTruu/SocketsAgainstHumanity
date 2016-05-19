import React, { Component, PropTypes } from 'react'

export default class Room extends Component {
  static propTypes = {
    room: PropTypes.array.isRequired,
  };

  render() {
    const { room } = this.props
    return (
      <div className="single-room">
        <div className="room-item">{room.id}</div>
        <div className="room-item">{room.creator}</div>
        <div className="room-item">{room.playerCount}</div>
      </div>
    )
  }
}
