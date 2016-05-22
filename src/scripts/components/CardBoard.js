import React, { Component, PropTypes } from 'react'

import Card from './Card'
export default class CardBoard extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    pickedCards: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { cards, color, pickedCards, type } = this.props
    if (type === 'chosen-cards') {
      return (
        <div className="card-container">
          {cards.length <= 0 ? '' : cards.filter(card => pickedCards.indexOf(card.id) >= 0).map(card =>
            <Card
              key={cards.indexOf(card)}
              id={card.id}
              type={color}
              text={card.text}
              pickedCards={pickedCards}
            />
          )}
        </div>
      )
    }
    return (
      <div className="card-container">
        {cards.length <= 0 ? '' : cards.filter(card => pickedCards.indexOf(card.id) < 0).map(card =>
          <Card
            key={cards.indexOf(card)}
            id={card.id}
            type={color}
            text={card.text}
            pickedCards={pickedCards}
          />
        )}
      </div>
    )
  }
}
