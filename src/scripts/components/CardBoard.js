import React, { Component, PropTypes } from 'react'

import Card from './Card'
export default class CardBoard extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    pickedCards: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    pick: PropTypes.number.isRequired,
  };

  render() {
    const { cards, pickedCards, type, pick } = this.props
    return (
      <div className="card-container">
        {cards.length <= 0 ? '' : cards.map(card =>
          <Card
            key={cards.indexOf(card)}
            id={card.id}
            type={type}
            text={card.text}
            pickedCards={pickedCards}
            pick={pick}
          />
        )}
        <div className="padding-element"></div>
      </div>
    )
  }
}
