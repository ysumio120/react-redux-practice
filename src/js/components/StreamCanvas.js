import React from 'react'
import { connect } from 'react-redux'

import StreamPlayer from './StreamPlayer'

import { addStream } from '../actions/streamsActions'
import { getChannel, postHistory } from '../utils/helpers'

class StreamCanvas extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      opWidth: 0,
      opHeight: 0,
      muted: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navChannel === this.props.activeChannel && 
        (prevProps.activeChannel !== this.props.activeChannel || 
          this.props.streams.length != prevProps.streams.length || 
          (!prevProps.resize && this.props.resize))) {

      this.optimizeStreamSize();
    
    }
  }

  playStream(channelID, channelName) {
    if(this.props.userLocal) {
      getChannel(channelID, (channel) => {

        if(channel) {
          const data = {
            channel_id: channel._id,
            channel: channel.name,
            game: channel.game,
            dateViewed: Date.now()
          }
          
          for(let i = 0; i < this.props.streams.length; i++) {
            if(this.props.streams[i].streamChannel == channel.name && this.props.streams[i].navChannel == this.props.activeChannel)
              return;
          }
  
          postHistory(this.props.userLocal.name, data, (data) => {
            console.log(data);
          });

          this.props.addStream(this.props.activeChannel, channelID, channelName)
        }
      })
    }
  }

  getBookmarkedChannels() {
    let channels  = [];

    for(let i = 0; i < this.props.bookmarks.length; i++) {
      if(this.props.bookmarks[i].bookmark === this.props.activeChannel) {
        channels = this.props.bookmarks[i].streams;
        break;
      }
    }

    const list = channels.map(channel => {
      return <li key={channel._id} onClick={() => {this.playStream(channel.channel_id, channel.channel)}}>{channel.channel}</li>
    })

    if(list.length == 0) {
      return <ul><i>No saved channels</i></ul>
    }
    return <ul>{list}</ul>
  }

  streamPlayers() {
    const filteredStreams = this.props.streams.filter((stream) => {
      return this.props.navChannel === stream.navChannel;
    })

    const streamPlayers = filteredStreams.map((stream, index) => {
      return <StreamPlayer 
        key={stream.navChannel + "-" + stream.streamChannel} 
        order={index} stream={stream} 
        width={this.state.opWidth} 
        height={this.state.opHeight}
        mute={this.state.muted ? true : false}
        />
    })

    return streamPlayers;
  }

  muteCanvas(e) {
    this.setState({muted: !this.state.muted});
  }

  openSettings(e) {
    this.props.setBookMark(this.props.activeChannel);

    for(let i = 0; i < this.props.bookmarks.length; i++) {
      if(this.props.bookmarks[i].bookmark == this.props.activeChannel) {
        return this.props.toggleModal(true, "update");
      }
    }

    this.props.toggleModal(true, "add");
  }

  optimizeStreamSize() {
    const numStreams = this.streamPlayers().length;
    const height = this.container.offsetHeight;
    const width = this.container.offsetWidth;
    // console.log(height)
    // console.log(width)

    let bestHeight = 0;
    let bestWidth = 0;

    for(let perRow = 1; perRow <= numStreams; perRow++) {
      const numRows = Math.ceil(numStreams / perRow);
      let maxHeight = Math.floor((height - 10) / numRows);
      let maxWidth = Math.floor(width / perRow);
      if (maxWidth * 9/16 < maxHeight) {
        maxHeight = maxWidth * 9/16;
      }
      else {
        maxWidth = (maxHeight) * 16/9;
      }
      if (maxWidth > bestWidth) {
        bestWidth = maxWidth;
        bestHeight = maxHeight;
      }
    }

    this.setState({opWidth: bestWidth, opHeight: bestHeight})
  }

  render() {
    const classNames = "stream-canvas" + (this.props.navChannel === this.props.activeChannel ? " show" : " hide");

    const muted = this.state.muted ? "fa fa-volume-off" : "fa fa-volume-up";

    return (
      <div className={classNames}>
        <div className="stream-canvas-header">
          <div className="header-tab">
            <div className="header-channel-name">
              <span>{this.props.navChannel}</span>
            </div>
          </div>
          <div className="header-tab">
            <div className="header-saved-channels">
              <span>Collections</span>
              <div className="header-dropdown header-channels-dropdown">
                {this.getBookmarkedChannels()}
              </div>
            </div>
          </div>          
          <div className="header-tab" onClick={this.muteCanvas.bind(this)}>
            <div className="" >
              <span>Mute/Unmute</span>
              <i className={muted} aria-hidden="true"></i>
            </div>
          </div>
          <div className="header-tab" onClick={this.openSettings.bind(this)}>
            <div className="">
              <span>Settings</span>
            </div>
          </div>
        </div>
        <div ref={container => this.container = container} className="stream-container">
          {this.streamPlayers()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLocal: state.user.userLocal,
    navChannel: ownProps.navChannel,
    resize: ownProps.resize,
    activeChannel: state.streams.activeChannel,
    streams: state.streams.streams,
    bookmarks: state.bookmarks.bookmarks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStream: (navChannel, streamChannelID, streamChannel) => {
      dispatch( addStream(navChannel, streamChannelID, streamChannel) )
    },
    setMuted: (muted) => {
      dispatch( {type: "SET_MUTED", muted} )
    }, 
    toggleModal: (toggle, modalType) => {
      dispatch( {type: "TOGGLE_MODAL", toggle, modalType} )
    },
    setBookMark: (channel) => {
      dispatch( {type: "SET_BOOKMARK_CHANNEL", channel} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamCanvas)