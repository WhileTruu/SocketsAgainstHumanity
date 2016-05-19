import React, { PropTypes, Component } from 'react'

export default class RoomList extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
  };

  render() {
    const { players } = this.props
    return (
      <div className="container">
        {players
          .map((player) => (
            <div
              key={players.indexOf(player)}
              className="player-name"
            >
              {player.nickname === '' ? player.id : player.nickname}
            </div>
          ))
        }
      </div>
    )
  }
}
