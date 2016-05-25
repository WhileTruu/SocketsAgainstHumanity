import React, { Component, PropTypes } from 'react'

export default class BlackCard extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    pick: PropTypes.number.isRequired,
  };

  createMarkup(text) { return { __html: text } }

  render() {
    const { text, pick } = this.props
    return (
      <div className="black-card-container">
        <div
          className={'gamecard black-card'}
        >
          <div className="cardText" dangerouslySetInnerHTML={this.createMarkup(text)}>
          </div>
          <div className="pick-count">
           {`pick ${pick}`}
          </div>
        </div>
      </div>
    )
  }
}
