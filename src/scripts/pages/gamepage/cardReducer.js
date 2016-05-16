import {
  RANDOM_CARD,
  IS_LOADING,
  IS_NOT_LOADING,
} from './cardAction'

export default function cardReducer(state = { results: {}, isLoading: false }, result) {
  switch (result.type) {
    case RANDOM_CARD: {
      return {
        results: result.results,
        isLoading: false,
      }
    }
    case IS_LOADING: {
      return {
        results: state.results,
        isLoading: true,
      }
    }
    case IS_NOT_LOADING: {
      return {
        results: state.results,
        isLoading: false,
      }
    }
    default:
      return {
        results: state.results,
        isLoading: state.isLoading,
      }
  }
}
