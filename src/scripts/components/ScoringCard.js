import React, { Component, PropTypes } from 'react'

import { getSocketId } from '../Socket'

import { addPoint } from '../state/cards/cardAction'

export default class ScoringCard extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
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
    const { text } = this.props
    return (
      <div
        onClick={::this.onCardClick}
      >
          {text}
      </div>
    )
  }
}
