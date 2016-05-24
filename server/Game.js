export default class Game {
  constructor(id, creatorNickname, creatorId) {
    this.state = 0
    this.id = id
    this.creatorNickname = creatorNickname
    this.gameStarterId = creatorId
    this.evaluator = { id: creatorId, index: 0 }
    this.players = [{ id: creatorId, nickname: creatorNickname, points: 0 }]
  }

  addPlayer(nickname, id) {
    this.players.push({ id, nickname, points: 0 })
  }

  nextEvaluator() {
    this.evaluator = { id: this.players[(this.evaluator.index + 1) % this.players.length].id, index: (this.evaluator.index + 1) % this.players.length }
  }

  addPoint(id) {
    this.players.filter((player) => player.id === id)[0].points += 1
  }
}
