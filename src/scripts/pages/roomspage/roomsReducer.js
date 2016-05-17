import {
  ROOMS_ARE_NOT_LOADING,
  ROOMS_ARE_LOADING,
  RECEIVED_ROOM_LIST,
} from './roomsAction'

export default function roomsReducer(state = { results: [], isLoading: false }, result) {
  switch (result.type) {
    case RECEIVED_ROOM_LIST: {
      return {
        results: result.results,
        isLoading: false,
      }
    }
    case ROOMS_ARE_LOADING: {
      return {
        results: state.results,
        isLoading: true,
      }
    }
    case ROOMS_ARE_NOT_LOADING: {
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
