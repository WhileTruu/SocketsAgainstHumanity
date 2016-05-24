import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ScoringCard from '../components/ScoringCard'
import ScoreBoard from '../components/ScoreBoard'

class ScoringPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    cards: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cards.cardsEvaluated === true) this.context.router.replace({ pathname: `/game${nextProps.game.id}` })
  }

  render() {
    const { evaluationCards, blackCard } = this.props.cards
    const { evaluator } = this.props.game
    const scoreAbles = []
    Object.keys(evaluationCards).forEach(playerId => {
      let scoreAbleCard = blackCard.text
      console.log(scoreAbleCard)
      for (let i = 0; i < evaluationCards[playerId].length; i++) {
        if (scoreAbleCard.includes('_')) {
          scoreAbleCard = scoreAbleCard.replace('_', evaluationCards[playerId][i].text)
        } else {
          scoreAbleCard = `${scoreAbleCard} ${evaluationCards[playerId][i].text}`
        }
      }
      scoreAbles.push({ playerId, scoreAbleCard })
    })
    return (
      <div className="main-container">
        {scoreAbles.map(scoreAble => (
          <ScoringCard
            key={scoreAbles.indexOf(scoreAble)}
            playerId={scoreAble.playerId}
            text={scoreAble.scoreAbleCard}
            evaluator={evaluator}
          />
        ))}
        <div>
          <ScoreBoard players={this.props.game.players} />
        </div>
      </div>
    )
  }
}

export default connect((value) => value)(ScoringPage)
