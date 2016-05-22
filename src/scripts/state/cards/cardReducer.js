import {
  BLACK_CARD_UPDATE,
  WHITE_CARD_UPDATE,
  PICKED_CARDS_UPDATE,
} from './cardAction'

export default function cards(
  state = {
    blackCard: 0,
    pickedCards: [],
    whiteCards: [],
  }, result) {
  switch (result.type) {
    case BLACK_CARD_UPDATE: {
      return {
        blackCard: result.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: state.whiteCards,
      }
    }
    case WHITE_CARD_UPDATE: {
      return {
        blackCard: state.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: result.whiteCards,
      }
    }
    case PICKED_CARDS_UPDATE: {
      return {
        blackCard: state.blackCard,
        pickedCards: result.pickedCards,
        whiteCards: state.whiteCards,
      }
    }
    default:
      return {
        blackCard: state.blackCard,
        pickedCards: state.pickedCards,
        whiteCards: state.whiteCards,
      }
  }
}
