import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Route from "./components/Root"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(<Route />, app);