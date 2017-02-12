import React from 'react'
import { connect } from 'react-redux'

import SearchResults from './SearchResults'
import NavColumn from './NavColumn'
import StreamCanvas from './StreamCanvas'
import ChatColumn from './ChatColumn'

import { fetchStreams } from '../actions/searchActions'
import { addStream } from '../actions/streamsActions'

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  appOnClick(e) {
    this.props.toggleSearch(false);
  }

  appendStreamCanvases() {
    const streamCanvases = this.props.navChannels.map((channel) => {
      return <StreamCanvas navChannel={channel} />
    })

    return streamCanvases;
  }

  render() {
    const navCollapse = this.props.navCollapse ? "nav-toggle-close fa-caret-right" : "fa-caret-left";
    const chatCollapse = this.props.chatCollapse ? "chat-toggle-close fa-caret-left" : "fa-caret-right";

    let extend = this.props.navCollapse ? "left-extend " : "";
    extend +=  this.props.chatCollapse ? "right-extend" : ""; 

    return (
      <div id="app" onClick={this.appOnClick.bind(this)}>
        <i onClick={() => this.props.toggleNav(!this.props.navCollapse)} className={"nav-toggle fa " + navCollapse} aria-hidden="true"></i>
        <i onClick={() => this.props.toggleChat(!this.props.chatCollapse)} className={"chat-toggle fa " + chatCollapse} aria-hidden="true"></i>
        <SearchResults />
        <NavColumn />
        <div id="main-col" className={extend}>
          {this.props.children}
          {this.appendStreamCanvases()}
        </div>
        <ChatColumn />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navChannels: state.streams.navChannels,
    navCollapse: state.app.navCollapse,
    chatCollapse: state.app.chatCollapse,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNav: (toggle) => {
      dispatch( {type:"TOGGLE_NAV", toggle: toggle})
    },
    toggleChat: (toggle) => {
      dispatch( {type:"TOGGLE_CHAT", toggle: toggle})
    },
    toggleSearch: (toggle) => {
      dispatch( {type:"TOGGLE_SEARCH", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)