
import { combineReducers } from "redux"

import app from './appReducer'
import dragdrop from './dragdropReducer'
import search from './searchReducer'
import user from './userReducer'
import streams from './streamsReducer'
import chats from './chatReducer'
import games from './gamesReducer'
import following from './followingReducer'
import history from './historyReducer'
import bookmarks from './bookmarkReducer'

export default combineReducers({
  app,
  dragdrop,
  search,
  user,
  streams,
  chats,
  games,
  following,
  history,
  bookmarks
})