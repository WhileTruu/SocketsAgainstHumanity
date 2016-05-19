import React, { Component, PropTypes } from 'react'

import Room from '../components/Room'

export default class RoomList extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
  };

  render() {
    const { rooms } = this.props
    return (
      <div>
        {rooms
          .map((room) => (
            <Room room={room} />
          ))
        }
      </div>
    )
  }
}
