import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ScoreBoard from '../components/ScoreBoard'
import ScoringCardBoard from '../components/ScoringCardBoard'

import { exitRoom } from '../state/game/gameAction'
import { getSocketId } from '../Socket'

class ScoringPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    cards: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      scoreToggle: false,
      winner: false,
      winnerName: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { players } = nextProps.game
    let winner = false
    for (let i = 0; i < players.length; i++) {
      if (players[i].points > 3) {
        winner = true
        this.setState({ scoreToggle: true, winner: true, winnerName: players[i].nickname })
      }
    }
    if (!winner && this.props.cards.cardsEvaluated === true) this.context.router.replace({ pathname: `/game${nextProps.game.id}` })
  }

  onExitRoom() {
    exitRoom()
    this.context.router.replace({ pathname: '/' })
  }

  toggleScores() {
    this.setState({ scoreToggle: !this.state.scoreToggle, winner: this.state.winner, winnerName: this.state.winnerName })
  }

  render() {
    const { evaluationCards, blackCard } = this.props.cards
    const { evaluator, players } = this.props.game
    const scoreAbles = []
    Object.keys(evaluationCards).forEach(playerId => {
      const scoreAble = []
      scoreAble.push({ type: 'black', text: blackCard.text, pick: blackCard.pick })
      for (let i = 0; i < evaluationCards[playerId].length; i++) {
        scoreAble.push({ type: 'white', text: evaluationCards[playerId][i].text, pick: 0 })
      }
      scoreAbles.push({ playerId, scoreAble })
    })
    return (
      <div className="game-container">
        <div className="head-buttons-container">
          <input
            className="main-button"
            type="button"
            onClick={::this.onExitRoom}
            value="exit room"
          />
          <input
            className="main-button"
            type="button"
            onClick={::this.toggleScores}
            value="scores"
            onMouseUp={event => event.target.blur()}
            onTouchEnd={event => event.target.blur()}
          />
        </div>
        <div>
          {this.state.scoreToggle ? <ScoreBoard players={this.props.game.players} /> : ''}
        </div>
          {this.state.winner ? <div className="component-heading">{`${this.state.winnerName} won.`}</div> : ''}
        <div className="component-heading">
          {Object.keys(evaluationCards).length === players.length - 1 || this.state.winner ?
            '' : 'Waiting for players to submit cards.'}
        </div>
        <div className="component-heading">
          {Object.keys(evaluationCards).length === players.length - 1 && evaluator.id === `/#${getSocketId()}` ?
            'Choose your favorite!' : ''}
        </div>
        {Object.keys(evaluationCards).length === players.length - 1 ?
          scoreAbles.map(scoreAble => (
          <ScoringCardBoard
            key={scoreAbles.indexOf(scoreAble)}
            playerId={scoreAble.playerId}
            cards={scoreAble.scoreAble}
            evaluator={evaluator}
          />
        )) : ''}
      </div>
    )
  }
}

export default connect((value) => value)(ScoringPage)
