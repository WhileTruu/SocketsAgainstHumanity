import { cloneDeep } from 'lodash'

export default class GameCards {
  constructor(gameId, whiteCardCount, blackCardCount) {
    this.gameId = gameId
    this.whiteCards = Array.from(Array(whiteCardCount).keys()).map((num) => num + 1)
    this.blackCards = Array.from(Array(blackCardCount).keys()).map((num) => num + 1)
    this.players = []
    this.currentBlackCard = -1
    this.evaluationCards = {}
  }

  addPlayers(players) {
    this.players = cloneDeep(players).map(player => ({ id: player.id, cards: [] }))
  }

  resetEvaluationCards() {
    this.evaluationCards = {}
  }

  updateEvaluationCards(playerId, evaluationCards) {
    return new Promise((resolve, reject) => {
      this.evaluationCards[playerId] = evaluationCards
      let i = 0
      evaluationCards.forEach(evaluationCard => {
        i++
        const playerCards = this.players.filter(player => player.id === playerId)[0].cards
        console.log(playerCards)
        playerCards.splice(playerCards.indexOf(evaluationCard.id), 1)
        this.whiteCards.splice(this.whiteCards.indexOf(evaluationCard.id), 1)
      })
      if (i === evaluationCards.length) {
        resolve()
      } else {
        reject('Error while adding evaluation cards')
      }
    })
  }

  updatePlayerCards() {
    this.evaluationCards = {}
    return new Promise((resolve, reject) => {
      const randomBlackCardIndex = Math.floor(Math.random() * this.blackCards.length)
      this.currentBlackCard = this.blackCards[randomBlackCardIndex]
      this.blackCards.splice(randomBlackCardIndex, 1)
      let i = 0
      this.players.forEach(player => {
        if (player.cards.length === 10) ++i
        while (player.cards.length < 10) {
          const randomIndex = Math.floor(Math.random() * this.whiteCards.length)
          player.cards.push(this.whiteCards[randomIndex])
          this.whiteCards.splice(randomIndex, 1)
          if (player.cards.length === 10) ++i
        }
        if (i === this.players.length) resolve()
      })
      if (i < this.players.length) reject('Not everyone got their cards, yo.')
    })
  }

  removePlayerCard(playerId, cardId) {
    const cards = this.players.filter(player => player.id === playerId)[0].cards
    cards.splice(cards.indexOf(cardId), 1)
    this.whiteCards.splice(this.whiteCards.indexOf(cardId), 1)
  }

  removeBlackCard(cardId) {
    this.blackCards.splice(this.blackCards.indexOf(cardId), 1)
  }
}
