import React from 'react'
import { connect } from 'react-redux'

import { getChannel } from '../utils/helpers'

class HistoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        channel: null
    };

  }

  componentDidMount() {
      getChannel(this.props.channel.channel, function(channel) {
          this.setState({channel: channel});
      }.bind(this));
  }

  historyInfo() {
    if(this.state.channel != null) {
      return (
        <div>
          <img className="channel-logo" src={this.state.channel.logo}/>
          <p className="historyChannelName"> {this.state.channel.display_name} </p>
          <p className="historyGameName"> {"Played " + this.props.channel.game} </p>
        </div>
      )
    }
  }

  render() {

    return (
      <li className="history-item">
        {this.historyInfo()}
      </li>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItem)