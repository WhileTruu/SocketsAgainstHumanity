import {
  JOINED_ROOM,
  IS_LOADING,
  IS_NOT_LOADING,
  UPDATE_ROOMS,
  CHANGE_NAME,
  ERROR,
} from './joinAction'

export default function join(state = { isLoading: false, rooms: [], myName: '', error: '' }, result) {
  switch (result.type) {
    case CHANGE_NAME: {
      return {
        rooms: state.rooms,
        myName: result.myName,
        error: '',
        isLoading: false,
      }
    }
    case UPDATE_ROOMS: {
      return {
        rooms: result.rooms,
        myName: state.myName,
        error: '',
        isLoading: false,
      }
    }
    case JOINED_ROOM: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        error: '',
        isLoading: false,
      }
    }
    case IS_LOADING: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        error: '',
        isLoading: true,
      }
    }
    case IS_NOT_LOADING: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        error: '',
        isLoading: false,
      }
    }
    case ERROR: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        error: result.error,
        isLoading: false,
      }
    }
    default:
      return {
        rooms: state.rooms,
        myName: state.myName,
        error: '',
        isLoading: state.isLoading,
      }
  }
}
