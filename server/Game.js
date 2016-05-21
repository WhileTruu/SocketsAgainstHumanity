export default class Game {
  constructor(id, creatorNickname, creatorId) {
    this.state = 0
    this.id = id
    this.creatorNickname = creatorNickname
    this.gameStarterId = creatorId
    this.players = [{ id: creatorId, nickname: creatorNickname, points: 0 }]
  }

  addPlayer(nickname, id) {
    this.players.push({ id, nickname, points: 0 })
  }

  addPoint(id) {
    this.players.filter((player) => player.id === id)[0].points += 1
  }
}
