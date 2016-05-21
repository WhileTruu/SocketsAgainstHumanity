import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PlayerList from '../components/PlayerList'
import { exitRoom } from '../state/game/gameAction'

class SingleRoomPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  onExitRoom() {
    exitRoom()
    this.context.router.replace({ pathname: '/' })
  }

  render() {
    const { id, players } = this.props.game
    return (
      <div>
        <div className="main-container">
          <div className="component-heading">{id}</div>
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
