import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 

import { addStream } from '../actions/streamsActions'
import { setGame, fetchTopGames } from '../actions/gamesActions'

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

  render() {
    return (
      <li onClick={() => this.props.addStream(this.props.activeChannel, this.props.name)}>
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
    activeChannel: state.streams.activeChannel,
    name: ownProps.stream.channel.name,
    displayName: ownProps.stream.channel.display_name,
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