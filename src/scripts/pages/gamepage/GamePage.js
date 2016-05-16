import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import { getRandomCard, retrievedRandomCard } from './cardAction'

const socket = io()

export default class GamePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    socket.on('get random card', (results) => {
      this.props.dispatch(retrievedRandomCard(results))
    })
  }

  onClickHandler(event) {
    event.preventDefault()
    this.props.dispatch(getRandomCard())
  }
  render() {
    return (
      <div>
        <div className="searchbar-container">
          <form onSubmit={::this.onClickHandler}>
            <input
              className="get-card-button"
              type="submit"
              ref="get-card-button"
              value="get card"
            />
          </form>
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(GamePage)
