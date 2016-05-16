import axios from 'axios'

const ip = 'localhost'

const instance = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*' },
})

function requestNewRoom(nickname) {
  return instance.post(`http://${ip}:1337/yolo`)
}

export {
  requestNewRoom,
}
