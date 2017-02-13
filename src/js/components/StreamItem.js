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
      channel: this.props.name,
      game: this.props.game,
      dateViewed: Date.now()
    }

    if(this.props.user) {
      postHistory(this.props.user.name, data, (data) => {
        console.log(data);
      })
    }
    this.props.addStream(this.props.activeChannel, this.props.name)
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
    user: state.user.user,
    activeChannel: state.streams.activeChannel,
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
    addStream: (navChannel, streamChannel) => {
      dispatch( addStream(navChannel, streamChannel) )
    },
    fecthGames: () => {
      dispatch( fetchTopGames() )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)