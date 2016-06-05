import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ScoreBoard from '../components/ScoreBoard'
import CardBoard from '../components/CardBoard'
import Card from '../components/Card'
import { submitCardsForEvaluation } from '../state/cards/cardAction'
import { exitRoom } from '../state/game/gameAction'

import { getSocketId } from '../Socket'

class GamePage extends Component {
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.evaluator.id === `/#${getSocketId()}`) this.context.router.replace({ pathname: '/scoringpage' })
  }

  onExitRoom() {
    exitRoom()
    this.context.router.replace({ pathname: '/' })
  }

  submitCards() {
    const { pickedCards, blackCard, whiteCards } = this.props.cards
    if (pickedCards.length < blackCard.pick) return
    submitCardsForEvaluation(pickedCards.map(card => whiteCards.filter(wcard => wcard.id === card)[0]))
    this.context.router.replace({ pathname: '/scoringpage' })
  }

  toggleScores() {
    this.setState({ scoreToggle: !this.state.scoreToggle })
  }

  render() {
    const { players } = this.props.game
    const { whiteCards, blackCard, pickedCards } = this.props.cards
    let submitText = 'submit cards'
    if (pickedCards.length < blackCard.pick) {
      const cardsToPick = blackCard.pick - pickedCards.length
      submitText = `choose ${cardsToPick} `
      submitText = submitText + (cardsToPick > 1 ? 'more cards' : 'card')
    }
    return (
      <div className="game-container">
        {whiteCards.length !== 0 && blackCard !== {} ?
        <div>
          <div>
            <div className="game-top-container">
              <div
                className="exit-button"
                type="button"
                onClick={::this.onExitRoom}
              >
              <i className="fa fa-chevron-left" />
              <span> exit</span>
              </div>
              <Card
                type="black"
                pickedCards={[]}
                id={0}
                text={blackCard.text}
                pick={blackCard.pick}
              />
              <input
                className="game-button"
                type="button"
                onClick={::this.toggleScores}
                value="scores"
                onMouseUp={event => event.target.blur()}
                onTouchEnd={event => event.target.blur()}
              />
            </div>
            <CardBoard
              className="white-card-board"
              type="white"
              pickedCards={pickedCards}
              cards={whiteCards}
              pick={blackCard.pick}
            />
          </div>
          <div className="game-items-container">
            <div>
              <input
                className="main-button"
                type="button"
                onClick={::this.submitCards}
                value={submitText}
                onMouseUp={event => event.target.blur()}
              />
            </div>
           </div>
         </div>
         :
         <div className="scores-container">
          <ScoreBoard players={players} />
         </div>
        }
        <ScoreBoard open={this.state.scoreToggle} players={players} />
      </div>
    )
  }
}

export default connect((value) => value)(GamePage)
