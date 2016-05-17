import React, { Component, PropTypes } from 'react'

export default class RoomList extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
  };

  render() {
    const { rooms } = this.props
    return (
      <div className="container">
        {rooms
          .map((room) => (
            <div>{room}</div>
          ))
        }
      </div>
    )
  }
}
