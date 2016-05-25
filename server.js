import path from 'path'
import express from 'express'

import { addListenersToSocket } from './sockets'

const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

if (process.argv[2] === 'develop') {
  const webpack = require('webpack')
  const config = require('./webpack.config')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(config)
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackMiddleware(compiler, {
    noInfo: false,
    stats: {
      colors: true,
    },
  }))
} else {
  const staticPath = path.join(__dirname, 'dist')
  app.use(express.static(staticPath))
}

addListenersToSocket(io)

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'build/index.html'))
})

http.listen(7331, (error) => {
  if (error) {
    console.log(error)
    return
  }
  console.log('Listening at http://localhost:1337')
})
