import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ScoreBoard from '../components/ScoreBoard'
import CardBoard from '../components/CardBoard'

export default class GamePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    cards: PropTypes.object.isRequired,
  }

  render() {
    const { players } = this.props.game
    const { whiteCards, blackCard, pickedCards } = this.props.cards
    return (
      <div className="main-container">
        {whiteCards.length !== 0 && blackCard !== {} ?
        <div>
          <CardBoard
            className="black-card-board"
            color="black"
            type="black-card"
            pickedCards={pickedCards}
            cards={[blackCard]}
          />
          <CardBoard
            className="chosen-card-board"
            color="white"
            type="chosen-cards"
            pickedCards={pickedCards}
            cards={whiteCards}
          />
          <CardBoard
            className="white-card-board"
            color="white"
            type="white-cards"
            pickedCards={pickedCards}
            cards={whiteCards}
          />
        </div> : ''}
        <ScoreBoard players={players} />
      </div>
    )
  }
}

export default connect((value) => value)(GamePage)
