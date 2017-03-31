import React from 'react'
import { connect } from 'react-redux'

import SearchResults from './SearchResults'
import NavColumn from './NavColumn'
import StreamCanvas from './StreamCanvas'
import ChatColumn from './ChatColumn'
import ModalBookmark from './ModalBookmark'

import { fetchStreams } from '../actions/searchActions'
import { addStream } from '../actions/streamsActions'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateBroswerSize.bind(this))
    this.setState({ width: this.canvasContainer.offsetWidth, height: this.canvasContainer.offsetHeight});
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navCollapse != prevProps.navCollapse || this.props.chatCollapse != prevProps.chatCollapse || this.props.listCollapse != prevProps.listCollapse)
      //setTimeout(() => {
        this.updateBroswerSize();
      //}, 200)
  }

  updateBroswerSize() {
    this.setState({ width: this.canvasContainer.offsetWidth, height: this.canvasContainer.offsetHeight})
  }

  appOnClick(e) {
    this.props.toggleSearch(false);
  }

  toggleList(toggle) {
    this.props.toggleList(toggle);
  }

  appendStreamCanvases() {
    const streamCanvases = this.props.navChannels.map((channel) => {
      return <StreamCanvas key={channel} navChannel={channel} width={this.state.width} height={this.state.height}/>
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
          <div className="list-toggle" onClick={() => this.toggleList(!this.props.listCollapse)}>
            <div><i className={"fa fa-caret-" + (this.props.listCollapse ? "down" : "up")} aria-hidden="true"></i></div>
          </div>
          <div className={(this.props.listCollapse || this.props.location.pathname == "/") ? "list-hide" : "list-show"}>
            {this.props.children}
          </div>
          <div className="canvas-container" ref={(canvasContainer) => {this.canvasContainer = canvasContainer}}>{this.appendStreamCanvases()}</div>
        </div>
        <ChatColumn />
        <div className={this.props.modalOpen ? "modal-dim" : "modal-no-dim"}></div>
        <ModalBookmark />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navChannels: state.streams.navChannels,
    navCollapse: state.app.navCollapse,
    chatCollapse: state.app.chatCollapse,
    listCollapse: state.app.listCollapse,
    modalOpen: state.bookmarks.modalOpen
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
    },
    toggleList: (toggle) => {
      dispatch( {type:"TOGGLE_LIST", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)