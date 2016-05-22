import React, { Component, PropTypes } from 'react'

import { pickedCardsUpdate } from '../state/cards/cardAction'
import { connect } from 'react-redux'

export default class Card extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    pickedCards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onCardClick() {
    const { type, id } = this.props
    if (type === 'black') return
    const indexOfPickedCard = this.props.pickedCards.indexOf(id)
    const pickedCards = this.props.pickedCards
    if (indexOfPickedCard > -1) {
      pickedCards.splice(pickedCards.indexOf(id, 1))
      this.props.dispatch(pickedCardsUpdate(pickedCards))
    } else {
      pickedCards.push(id)
      this.props.dispatch(pickedCardsUpdate(pickedCards))
    }
  }

  render() {
    const { type, text } = this.props
    return (
      <div
        className={`gamecard ${type}-card`}
        onClick={::this.onCardClick}
      >
        <div className="cardText">
          {text}
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(Card)
