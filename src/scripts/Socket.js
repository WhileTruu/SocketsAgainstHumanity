import io from 'socket.io-client'

let instance = null

export default class Socket {
  constructor() {
    if (!instance) {
      instance = io()
    }

    return instance
  }
}

export function getSocketId() {
  return instance.id
}
