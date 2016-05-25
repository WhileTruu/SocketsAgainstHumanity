import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PlayerList from '../components/PlayerList'
import Alert from '../components/Alert'
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

  constructor(props) {
    super(props)
    this.state = {
      error: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ error: '' })
    if (nextProps.game.state === 1) {
      this.context.router.replace({ pathname: `/game${nextProps.game.id}` })
    }
  }

  onExitRoom() {
    exitRoom()
    this.context.router.replace({ pathname: '/' })
  }

  onStartGame(id) {
    if (this.props.game.players.length < 2) {
      this.setState({ error: 'You need at least two players.' })
      return
    }
    startGame(id)
  }

  render() {
    const { error } = this.state
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
                onClick={() => this.onStartGame(id)}
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
          {error === '' ? '' : <Alert alertType="warning" message={error} />}
        </div>
      </div>
    )
  }
}

export default connect(value => value)(SingleRoomPage)
