import React, { Component, PropTypes } from 'react'

export default class Card extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { type, text } = this.props
    return (
      <div className={`gamecard ${type}-card`}>
        <div className="cardText">
          {text}
        </div>
      </div>
    )
  }
}
