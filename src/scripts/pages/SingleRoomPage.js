import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PlayerList from '../components/PlayerList'
import { exitRoom, startGame } from '../state/game/gameAction'
import { getSocketId } from '../Socket'

class SingleRoomPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.state === 1) {
      this.context.router.replace({ pathname: `/rooms/${nextProps.game.id}/game` })
    }
  }

  onExitRoom() {
    exitRoom()
    this.context.router.replace({ pathname: '/' })
  }

  onStartGame(id) {
    startGame(id)
  }

  render() {
    const mySocketId = `/#${getSocketId()}`
    const { id, players, gameStarterId } = this.props.game
    return (
      <div>
        <div className="main-container">
          <div className="component-heading">{id}</div>
          <PlayerList players={players} />
          {mySocketId === gameStarterId ?
            <div>
              <input
                className="main-button"
                type="button"
                onClick={() => startGame(id)}
                value="start game"
              />
            </div> : ''
          }
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
