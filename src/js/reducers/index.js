
import { combineReducers } from "redux"

import app from './appReducer'
import search from './searchReducer'
import user from './userReducer'
import streams from './streamsReducer'
import games from './gamesReducer'
import following from './followingReducer'

export default combineReducers({
  app,
  search,
  user,
  streams,
  games,
  following
})