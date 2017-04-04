import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 

import { addStream } from '../actions/streamsActions'
import { setGame, fetchTopGames } from '../actions/gamesActions'

import { postHistory } from '../utils/helpers'

class Game extends React.Component {
  
  constructor(props) {
    super(props);
  }

  formatNumWithCommas(number) {
    var result = [];
    number = number.toString();
    if(number.length <= 3)
      return number;
    else {
      do {
        var sub = number.substr(number.length-3);
        result.unshift(sub);
        number = number.substr(0, number.length-3);
      }while(number.length > 3);
      result.unshift(number);
    }

    return result.join();
  }

  onClickHandler(activeChannel) {
    const data = {
      channel_id: this.props.channelID,
      channel: this.props.name,
      game: this.props.game,
      dateViewed: Date.now()
    }

    if(this.props.userLocal) {
      for(let i = 0; i < this.props.streams.length; i++) {
        if(this.props.streams[i].streamChannel == this.props.name && this.props.streams[i].navChannel == this.props.activeChannel) {
          return;
        }
      }
      
      postHistory(this.props.userLocal.name, data, (data) => {
        console.log(data);
      })

      this.props.addStream(this.props.activeChannel, this.props.channelID, this.props.name)
    }
  }

  render() {
    return (
      <li onClick={() => this.onClickHandler(this.props.activeChannel)}>
        <img className="stream-image" src={this.props.preview}/>
        <div className="stream-info">
          <p className="stream-status" title={this.props.status}>{this.props.status}</p>
          <p className="stream-channel">{this.formatNumWithCommas(this.props.viewerCount)} viewers on {this.props.displayName}</p>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLocal: state.user.userLocal,
    activeChannel: state.streams.activeChannel,
    streams: state.streams.streams,
    channelID: ownProps.stream.channel._id, 
    name: ownProps.stream.channel.name,
    displayName: ownProps.stream.channel.display_name,
    game: ownProps.stream.game,
    preview: ownProps.stream.preview.large,
    status: ownProps.stream.channel.status,
    viewerCount: ownProps.stream.viewers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStream: (navChannel, streamChannelID, streamChannel) => {
      dispatch( addStream(navChannel, streamChannelID, streamChannel) )
    },
    fecthGames: () => {
      dispatch( fetchTopGames() )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)