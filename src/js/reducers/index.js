
import { combineReducers } from "redux"

import app from './appReducer'
import search from './searchReducer'
import user from './userReducer'
import streams from './streamsReducer'
import chats from './chatReducer'
import games from './gamesReducer'
import following from './followingReducer'

export default combineReducers({
  app,
  search,
  user,
  streams,
  chats,
  games,
  following
})