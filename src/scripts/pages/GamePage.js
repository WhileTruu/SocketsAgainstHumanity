import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ScoreBoard from '../components/ScoreBoard'
import CardBoard from '../components/CardBoard'

export default class GamePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }

  render() {
    const { players } = this.props.game
    return (
      <div className="main-container">
        <CardBoard
          className="black-card-board"
          cards={[{ id: 1, type: 'black', text: 'What\'s that smell?' }]}
        />
        <CardBoard
          className="chosen-card-board"
          cards={[]}
        />
        <CardBoard
          className="white-card-board"
          cards={
          [{ id: 1, type: 'white', text: 'The placenta.' },
           { id: 1, type: 'white', text: 'Tom Cruise.' },
           { id: 1, type: 'white', text: 'Ethnic cleansing.' },
           { id: 1, type: 'white', text: 'The terrorists.' },
           { id: 1, type: 'white', text: 'Foreskin.' },
           { id: 1, type: 'white', text: 'A falcon with a cap on its head.' },
           { id: 1, type: 'white', text: 'Historically black colleges.' },
           { id: 1, type: 'white', text: 'A micropenis.' },
           { id: 1, type: 'white', text: 'Eating all of the cookies before the AIDS bake-sale.' },
           { id: 1, type: 'white', text: 'The Chinese gymnastics team.' }]
          }
        />
        <ScoreBoard players={players} />
      </div>
    )
  }
}

export default connect((value) => value)(GamePage)
