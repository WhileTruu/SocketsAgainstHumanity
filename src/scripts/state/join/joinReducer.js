import {
  JOINED_ROOM,
  IS_LOADING,
  IS_NOT_LOADING,
  UPDATE_ROOMS,
  CHANGE_NAME,
} from './joinAction'

export default function join(state = { isLoading: false, rooms: [], myName: '' }, result) {
  switch (result.type) {
    case CHANGE_NAME: {
      return {
        rooms: state.rooms,
        myName: result.myName,
        isLoading: false,
      }
    }
    case UPDATE_ROOMS: {
      return {
        rooms: result.rooms,
        myName: state.myName,
        isLoading: false,
      }
    }
    case JOINED_ROOM: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        isLoading: false,
      }
    }
    case IS_LOADING: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        isLoading: true,
      }
    }
    case IS_NOT_LOADING: {
      return {
        rooms: state.rooms,
        myName: state.myName,
        isLoading: false,
      }
    }
    default:
      return {
        rooms: state.rooms,
        myName: state.myName,
        isLoading: state.isLoading,
      }
  }
}
