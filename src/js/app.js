import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Route from "./components/Root"
import store from "./store"

const Root = document.getElementById('root')

ReactDOM.render(<Route />, Root);