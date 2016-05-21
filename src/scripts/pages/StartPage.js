import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  createNewRoom,
  changeName,
} from '../state/join/joinAction'

export default class StartPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    join: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    if (this.props.join.myName !== '') this.refs.nickname.value = this.props.join.myName
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.id !== null && nextProps.game.id !== this.props.game.id) {
      this.context.router.push({ pathname: `rooms/${nextProps.game.id}` })
    }
  }

  onCreateRoom(event) {
    event.preventDefault()
    this.props.dispatch(createNewRoom(this.props.join.myName))
  }

  onFindRoom(event) {
    event.preventDefault()
    this.context.router.push({ pathname: 'rooms' })
  }

  onNameChange(event) {
    this.props.dispatch(changeName(event.target.value))
  }


  render() {
    return (
      <div>
        <div className="main-container">
          <div className="component-heading">Sockets Against Humanity</div>
          <div>
            <input
              className="text-input"
              type="text"
              ref="nickname"
              onChange={::this.onNameChange}
              placeholder="enter your nickname"
            />
          </div>
          <div>
            <input
              className="main-button"
              type="button"
              onClick={::this.onCreateRoom}
              value="create room"
            />
          </div>
          <div>
            <input
              className="main-button"
              type="button"
              onClick={::this.onFindRoom}
              value="find room"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(StartPage)
