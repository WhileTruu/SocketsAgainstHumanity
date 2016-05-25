import React, { Component, PropTypes } from 'react'

export default class Alert extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    alertType: PropTypes.string.isRequired,
  };

  render() {
    const { message, alertType } = this.props
    return (
      <div className={`sah-alert --${alertType}`}>
        {message}
      </div>
    )
  }
}
