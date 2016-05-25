import React, { Component, PropTypes } from 'react'

export default class ScoringCard extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    pick: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  };

  createMarkup(text) { return { __html: text } }

  render() {
    const { text, pick, type } = this.props
    return (
      <div className="black-card-container">
        <div
          className={`gamecard ${type}-card`}
        >
          <div className="cardText" dangerouslySetInnerHTML={this.createMarkup(text)}>
          </div>
          {type === 'white' ? '' :
            <div className="pick-count">
              {`pick ${pick}`}
            </div>
          }
        </div>
      </div>
    )
  }
}
