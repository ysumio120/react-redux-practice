import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class NavChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      validChannel: false,
      inputOpen: false
    }
  }

  onMouseEnter(e) {
    e.stopPropagation();
    e.target.className = "fa fa-bookmark"
  }

  onMouseLeave(e) {
    e.stopPropagation();
    e.target.className = "fa fa-bookmark-o"
  }

  onChangeInput(e) {
    const navChannels = this.props.navChannels;
    const value = e.target.value.toLowerCase().trim();
    for(let i = 0; i < navChannels.length; i++)  {
      if(value === navChannels[i].toLowerCase().trim() || value === "") {
        this.setState({validChannel: false});
        break;
      }
      else 
        this.setState({validChannel: true})
    }
  }

  onToggleInput() {
    document.querySelector("#addChannel input").value = "";
    this.setState({inputOpen: !this.state.inputOpen})
  }

  onSubmit() {
    const channel = document.querySelector("#addChannel input").value;
    this.props.addChannel(channel);
    document.querySelector("#addChannel input").value = "";
    this.setState({validChannel: false, inputOpen: !this.state.inputOpen});
  }

  getChannels() {
    const channels = this.props.navChannels.map((channel) => {
      return <li onClick={() => this.props.setActiveChannel(channel)} className={this.props.activeChannel == channel ? "active" : ""}><i onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className="fa fa-bookmark-o"  aria-hidden="true"></i>{channel}</li>
    })

    return channels;
  }

  render() {

    return (
      <div id="nav-channels" className="nav-list">
        <div className="nav-header">
          <span>ACTIVE CHANNELS</span>
          <i onClick={this.onToggleInput.bind(this)} className="fa fa-plus" aria-hidden="true"></i>
          <hr/>
        </div>
        <div id="addChannel" className={this.state.inputOpen ? "open" : "close" }>
          <input onChange={this.onChangeInput.bind(this)} placeholder="Enter channel name"/>
          <button onClick={this.onSubmit.bind(this)} disabled={!this.state.validChannel}>OK</button><button onClick={this.onToggleInput.bind(this)}>Close</button>
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
    navChannels: state.streams.navChannels
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChannel: (channelName) => {
      dispatch( {type: "ADD_CHANNEL", channel: channelName} )
    },
    setActiveChannel: (channelName) => {
      dispatch( {type: "SET_CHANNEL", navChannel: channelName} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavChannelsList)