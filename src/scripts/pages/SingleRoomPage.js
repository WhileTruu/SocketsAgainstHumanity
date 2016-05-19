import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PlayerList from '../components/PlayerList'
import { getPlayersForRoom } from '../state/game/gameAction'

class SingleRoomPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }

  componentWillMount() {
    getPlayersForRoom(this.props.game.room)
  }

  render() {
    const { players } = this.props.game
    return (
      <div>
        <div className="main-container">
          <div className="component-heading">{this.props.game.room}</div>
          <PlayerList players={players} />
        </div>
      </div>
    )
  }
}

export default connect(value => value)(SingleRoomPage)
