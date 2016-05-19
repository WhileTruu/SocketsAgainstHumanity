import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export default class GamePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    /* this.props.route.socket.on('get random card', (results) => {
      this.props.dispatch(retrievedRandomCard(results))
    })*/
    console.log('empty constructor')
  }

  onClickHandler(event) {
    event.preventDefault()
    // this.props.dispatch(getRandomCard())
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
