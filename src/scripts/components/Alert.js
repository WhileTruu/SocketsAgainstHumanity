import React, { Component, PropTypes } from 'react'

export default class Alert extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequried,
  };

  render() {
    const { message, type } = this.props
    return (
      <div className={`sah-alert --${type}`}>
        {message}
      </div>
    )
  }
}
