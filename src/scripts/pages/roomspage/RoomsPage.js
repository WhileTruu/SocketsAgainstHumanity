import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

class RoomsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="rooms-page">
        'WELCOME TWO THE APAAAG OR FFOOMS'
      </div>
    )
  }
}

export default connect(value => value)(RoomsPage)
