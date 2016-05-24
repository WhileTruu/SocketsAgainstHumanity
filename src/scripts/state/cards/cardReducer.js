import {
  BLACK_CARD_UPDATE,
  WHITE_CARD_UPDATE,
  PICKED_CARDS_UPDATE,
  EVALUATION_CARDS_UPDATE,
  TOGGLE_CARDS_EVALUATED,
} from './cardAction'

export default function cards(
  state = {
    blackCard: 0,
    pickedCards: [],
    whiteCards: [],
    evaluationCards: {},
    cardsEvaluated: false,
  }, result) {
  switch (result.type) {
    case EVALUATION_CARDS_UPDATE: {
      return {
        blackCard: state.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: state.whiteCards,
        evaluationCards: result.evaluationCards,
        cardsEvaluated: false,
      }
    }
    case BLACK_CARD_UPDATE: {
      return {
        blackCard: result.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: state.whiteCards,
        evaluationCards: state.evaluationCards,
        cardsEvaluated: false,
      }
    }
    case WHITE_CARD_UPDATE: {
      return {
        blackCard: state.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: result.whiteCards,
        evaluationCards: state.evaluationCards,
        cardsEvaluated: false,
      }
    }
    case PICKED_CARDS_UPDATE: {
      return {
        blackCard: state.blackCard,
        pickedCards: result.pickedCards,
        whiteCards: state.whiteCards,
        evaluationCards: state.evaluationCards,
        cardsEvaluated: false,
      }
    }
    case TOGGLE_CARDS_EVALUATED: {
      return {
        blackCard: state.blackCard,
        pickedCards: [],
        whiteCards: state.whiteCards,
        evaluationCards: {},
        cardsEvaluated: !state.cardEvaluated,
      }
    }
    default:
      return {
        blackCard: state.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: state.whiteCards,
        evaluationCards: state.evaluationCards,
        cardEvaluated: false,
      }
  }
}
