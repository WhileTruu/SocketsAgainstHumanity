import React, { PropTypes, Component } from 'react'

export default class ScoreBoard extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
  };

  render() {
    const { players, open } = this.props
    return (
      <div className={`score-container${open ? ' open' : ' closed'}`}>
        <div className="score-row">
          <div className="score-item">Player</div>
          <div className="score-item">Score</div>
        </div>
        {players
          .map((player) => (
            <div
              key={players.indexOf(player)}
              className="score-row"
            >
              <div className="score-item">{player.nickname}</div>
              <div className="score-item">{player.points}</div>
            </div>
          ))
        }
      </div>
    )
  }
}
