import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import StartPage from './pages/startpage/StartPage'
import GamePage from './pages/gamepage/GamePage'
import RoomsPage from './pages/roomspage/RoomsPage'
// import Loader from './components/Loader'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={StartPage} />
      <Route path="rooms/:id" component={RoomsPage} />
      <Route path="rooms/:id/game" component={GamePage} />
    </Route>
  </Router>
)
