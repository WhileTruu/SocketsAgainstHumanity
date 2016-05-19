import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import RoomsPage from './pages/RoomsPage'
import SingleRoomPage from './pages/SingleRoomPage'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={StartPage} />
      <Route path="rooms/:id" component={SingleRoomPage} />
      <Route path="rooms" component={RoomsPage} />
      <Route path="rooms/:id/game" component={GamePage} />
    </Route>
  </Router>
)
