import {
  JOINED_ROOM,
  IS_LOADING,
  IS_NOT_LOADING,
} from './startAction'

export default function startReducer(state = { results: {}, isLoading: false }, result) {
  switch (result.type) {
    case JOINED_ROOM: {
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
