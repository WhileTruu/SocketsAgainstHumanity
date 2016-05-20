import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PlayerList from '../components/PlayerList'
import { getPlayersForRoom, exitRoom } from '../state/game/gameAction'

class SingleRoomPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    getPlayersForRoom(this.props.game.room)
  }

  onExitRoom() {
    exitRoom()
    this.context.router.push({ pathname: '/' })
  }

  render() {
    const { players } = this.props.game
    return (
      <div>
        <div className="main-container">
          <div className="component-heading">{this.props.game.room}</div>
          <PlayerList players={players} />
          <div>
            <input
              className="main-button"
              type="button"
              onClick={::this.onExitRoom}
              value="exit room"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(value => value)(SingleRoomPage)
