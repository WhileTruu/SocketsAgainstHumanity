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
    pick: PropTypes.number.isRequired,
  };

  onCardClick() {
    const { type, id, pick } = this.props
    if (type === 'black') return
    const indexOfPickedCard = this.props.pickedCards.indexOf(id)
    const pickedCards = this.props.pickedCards
    if (indexOfPickedCard > -1) {
      pickedCards.splice(pickedCards.indexOf(id), 1)
      this.props.dispatch(pickedCardsUpdate(pickedCards))
    } else if (pickedCards.length < pick) {
      pickedCards.push(id)
      this.props.dispatch(pickedCardsUpdate(pickedCards))
    }
  }

  createMarkup(text) { return { __html: text } }

  render() {
    const { type, text, id, pickedCards, pick } = this.props
    return (
      <div
        className={`gamecard ${type}-card${pickedCards.indexOf(id) < 0 ? '' : ' picked-card'}`}
        onClick={::this.onCardClick}
      >
        <div
          className="cardText"
          dangerouslySetInnerHTML={this.createMarkup(text)}
        >
        </div>
        {type === 'black' ?
          <div className="pick-count">
           {`pick ${pick}`}
          </div>
        : ''}
      </div>
    )
  }
}

export default connect((value) => value)(Card)
