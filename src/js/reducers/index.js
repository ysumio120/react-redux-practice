
import { combineReducers } from "redux"

import search from './searchReducer'
import user from './userReducer'
import streams from './streamsReducer'

export default combineReducers({
  search,
  user,
  streams
})