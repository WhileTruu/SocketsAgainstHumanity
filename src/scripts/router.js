import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import StartPage from './pages/startpage/StartPage'
import GamePage from './pages/gamepage/GamePage'
import RoomsPage from './pages/roomspage/RoomsPage'
import SingleRoomPage from './pages/singleroompage/SingleRoomPage'
// import Loader from './components/Loader'

import io from 'socket.io-client'
const socket = io()

export default (
  <Router history={browserHistory}>
    <Route path="/" socket={socket} component={App}>
      <IndexRoute socket={socket} component={StartPage} />
      <Route path="rooms/:id" socket={socket} component={SingleRoomPage} />
      <Route path="rooms" socket={socket} component={RoomsPage} />
      <Route path="rooms/:id/game" socket={socket} component={GamePage} />
    </Route>
  </Router>
)
