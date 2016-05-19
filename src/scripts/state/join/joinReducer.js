import {
  JOINED_ROOM,
  IS_LOADING,
  IS_NOT_LOADING,
  UPDATE_ROOMS,
} from './joinAction'

export default function join(state = { isLoading: false, rooms: [] }, result) {
  switch (result.type) {
    case UPDATE_ROOMS: {
      return {
        rooms: result.rooms,
        isLoading: false,
      }
    }
    case JOINED_ROOM: {
      return {
        rooms: state.rooms,
        isLoading: false,
      }
    }
    case IS_LOADING: {
      return {
        rooms: state.rooms,
        isLoading: true,
      }
    }
    case IS_NOT_LOADING: {
      return {
        rooms: state.rooms,
        isLoading: false,
      }
    }
    default:
      return {
        rooms: state.rooms,
        isLoading: state.isLoading,
      }
  }
}
