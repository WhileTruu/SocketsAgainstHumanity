import React, { Component, PropTypes } from 'react'

import ScoringCard from './ScoringCard'

import { getSocketId } from '../Socket'
import { addPoint } from '../state/cards/cardAction'

export default class ScoringCardBoard extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    playerId: PropTypes.string.isRequired,
    evaluator: PropTypes.object.isRequired,
  };

  onCardClick() {
    if (this.props.evaluator.id === `/#${getSocketId()}`) {
      console.log(this.props.playerId)
      addPoint(this.props.playerId)
    }
  }

  render() {
    const { cards } = this.props
    return (
      <div
        className="card-container"
        onClick={::this.onCardClick}
      >
        {cards.length <= 0 ? '' : cards.map(card =>
          <ScoringCard
            key={cards.indexOf(card)}
            type={card.type}
            text={card.text}
            pick={card.pick}
          />
        )}
        <div className="padding-element"></div>
      </div>
    )
  }
}
