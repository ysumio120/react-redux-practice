import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from '../store'

import App from './App';
import Results from './Results'
import GamesList from './GamesList'
import Following from './Following'
import History from './History'

const Root = (props) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Results}/>
        <Route path="/games" component={GamesList}/>
        <Route path="/following" component={Following}/>
        <Route path="/history" component={History}/>
      </Route>
    </Router>
  </Provider>
);

export default Root;