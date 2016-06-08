import React, { Component, PropTypes } from 'react'

import Room from '../components/Room'

export default class RoomList extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    myName: PropTypes.string.isRequired,
  };

  render() {
    const { rooms, myName } = this.props
    return (
      <div>
        {rooms
          .map((room) => (
            <div className="row-items-container">
              <Room myName={myName} key={rooms.indexOf(room)} room={room} />
            </div>
          ))
        }
      </div>
    )
  }
}
