import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Root from "./components/Root"
import store from "./store"

ReactDOM.render(<Root />, document.getElementById('root'));