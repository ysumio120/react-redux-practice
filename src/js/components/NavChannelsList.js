import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 


class NavChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      validChannel: false,
      inputOpen: false
    }

    //this.onChange = this.onChange.bind(this);
  }

  onMouseEnter(e) {
    e.stopPropagation();
    e.target.className = "fa fa-bookmark"
  }

  onMouseLeave(e) {
    e.stopPropagation();
    e.target.className = "fa fa-bookmark-o"
  }

  onChange(e) {
    console.log(e.target.value)
    if(e.target.value === "league" || e.target.value === "")
      this.setState({validChannel: false})
    else 
      this.setState({validChannel: true})
  }

  onToggleInput() {
    this.setState({inputOpen: !this.state.inputOpen})
  }

  onSubmit() {
    const channel = document.querySelector("#addChannel input").value;
    this.props.addChannel(channel);
  }

  getChannels() {
    const channels = this.props.streams.map((stream) => {
      return <li><i onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className="fa fa-bookmark-o"  aria-hidden="true"></i>{stream.name}</li>
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
          <input onChange={this.onChange.bind(this)} placeholder="Enter channel name"/>
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
    streams: state.streams.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChannel: (channelName) => {
      dispatch( {type: "ADD_CHANNEL", channel: channelName} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavChannelsList)