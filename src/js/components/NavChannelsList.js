import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import NavChannel from './NavChannel'

class NavChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      validChannel: false,
      inputOpen: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navCollapse && this.state.inputOpen) {
      this.setState({inputOpen: false});
    }
  }

  onChangeInput(e) {
    const navChannels = this.props.navChannels;
    const value = this.input.value.trim();

    if(value && navChannels.length == 0) {
        this.setState({validChannel: true});
    }

    for(let i = 0; i < navChannels.length; i++)  {
      if(value === navChannels[i].trim() || value === "") {
        this.setState({validChannel: false});
        break;
      }
      else 
        this.setState({validChannel: true})
    }
  }

  onToggleInput() {
    this.input.value = "";

    if(this.props.navCollapse) {
      this.props.toggleNav(false);
    }

    this.input.focus();
    this.setState({validChannel: false, inputOpen: !this.state.inputOpen})
  }

  onSubmit() {
    const channel = this.input.value;
    this.props.addChannel(channel);
    this.input.value = "";
    this.setState({validChannel: false});
  }

  getChannels() {
    const channels = this.props.navChannels.map((channel) => {
      return <NavChannel key={"tab--" + channel} channel={channel} />
    })

    return channels;
  }

  render() {

    return (
      <div id="nav-channels" className="nav-list">
        <div className="nav-header">
          <span>ACTIVE TABS</span>
          <i onClick={this.onToggleInput.bind(this)} className="fa fa-plus" aria-hidden="true"></i>
        </div>
        <div id="addChannel" className={(this.state.inputOpen && !this.props.navCollapse) ? "open" : "close" }>
          <input ref={input => {this.input = input}} onChange={this.onChangeInput.bind(this)} placeholder="Enter tab name"/>
          <button onClick={this.onSubmit.bind(this)} disabled={!this.state.validChannel}>OK</button>
          <button onClick={this.onToggleInput.bind(this)}>Close</button>
        </div>
        <ul>
          {this.getChannels()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeChannel: state.streams.activeChannel,
    navChannels: state.streams.navChannels,
    navCollapse: state.app.navCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChannel: (channelName) => {
      dispatch( {type: "ADD_CHANNEL", navChannel: channelName} )
    },
    setActiveChannel: (channelName) => {
      dispatch( {type: "SET_CHANNEL", navChannel: channelName} )
    },
    toggleNav: (toggle) => {
      dispatch( {type:"TOGGLE_NAV", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavChannelsList)