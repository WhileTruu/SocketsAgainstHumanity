import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Alert from '../components/Alert'

import {
  createNewRoom,
  changeName,
} from '../state/join/joinAction'

class StartPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    join: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      error: '',
    }
  }

  componentDidMount() {
    if (this.props.join.myName !== '') this.refs.nickname.value = this.props.join.myName
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ error: nextProps.join.error })
    if (nextProps.game.id !== null && nextProps.game.id !== this.props.game.id) {
      this.context.router.push({ pathname: `room${nextProps.game.id}` })
    }
  }

  onCreateRoom(event) {
    event.preventDefault()
    if (this.validateName()) {
      this.props.dispatch(createNewRoom(this.props.join.myName))
    }
  }

  onFindRoom(event) {
    event.preventDefault()
    if (this.validateName()) {
      this.context.router.push({ pathname: 'rooms' })
    }
  }

  onNameChange(event) {
    this.setState({ error: '' })
    this.props.dispatch(changeName(event.target.value))
  }

  validateName() {
    if (this.props.join.myName.length < 1) {
      this.setState({ error: 'Please enter a name.' })
      return false
    }
    if (this.props.join.myName.length > 20) {
      this.setState({ error: 'Please choose a shorter name.' })
      return false
    }
    return true
  }

  render() {
    const { error } = this.state
    return (
      <div>
        <div className="main-container">
          <div className="component-heading">Sockets Against Humanity</div>
          <div className="row-items-container">
            <input
              className="text-input"
              type="text"
              ref="nickname"
              onChange={::this.onNameChange}
              placeholder="enter your name"
            />
          </div>
          <div className="row-items-container">
            <input
              className="main-button"
              type="button"
              onClick={::this.onCreateRoom}
              value="create room"
            />
          </div>
          <div className="row-items-container">
            <input
              className="main-button"
              type="button"
              onClick={::this.onFindRoom}
              value="find room"
            />
          </div>
          {error === '' ? '' : <Alert alertType="warning" message={error} />}
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(StartPage)
