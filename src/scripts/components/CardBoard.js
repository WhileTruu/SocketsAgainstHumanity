import React, { Component, PropTypes } from 'react'

import Card from './Card'
export default class CardBoard extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  };

  render() {
    const { cards } = this.props
    return (
      <div className="card-container">
        {cards.length <= 0 ? '' : cards.map(card =>
          <Card key={cards.indexOf(card)} id={card.id} type={card.type} text={card.text} />
        )}
      </div>
    )
  }
}
