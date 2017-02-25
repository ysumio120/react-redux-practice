import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream, removeStream } from '../actions/streamsActions'
import { addChat } from '../actions/chatActions'

class StreamPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      player: null,
      dragging: false
    }
  }

  componentDidMount() {
    //this.vid.addEventListener("transitionend", this.setPosition.bind(this));

    this.setState({
      // top: this.vid.offsetTop,
      // left: this.vid.offsetLeft,
      channel: this.props.stream.streamChannel, 
      player: new Twitch.Player(this.props.stream.navChannel + "-" + this.props.stream.streamChannel, {channel: this.props.stream.streamChannel})
    })
  }

  setPosition() {
    this.setState({top: this.vid.offsetTop, left: this.vid.offsetLeft});
  }

  dragStart(e) {
    e.preventDefault();
    console.log(e.pageY)
    console.log(e.target)

    this.setState({dragging: true, xPos: e.pageX, yPos: e.pageY})
  }

  dragStop(e) {
    e.preventDefault();

    this.setState({dragging: false})
  }

  onDrag(e) {
    if(this.state.dragging) {
      console.log(this.vid.offsetLeft);
      console.log(this.vid.offsetTop);
      const xOffset = e.pageX - this.state.xPos;
      const yOffset = e.pageY - this.state.yPos;

      console.log(xOffset)
      console.log(yOffset)


      this.setState({top: yOffset, left: xOffset, xPos: e.pageX, yPos: e.pageY});
    }
  }

  render() {
    const style = {
      width: this.props.width + "px",
      height: this.props.height + "px",
      order: this.props.order
    }

    const style2 = {
      top: this.state.top + "px",
      left: this.state.left + "px",
    }

    const mainStyle = this.state.dragging ? {...style, ...style2} : {...style};



    return (
      <div ref={vid => this.vid = vid} style={mainStyle} className={"vid " + (this.state.dragging ? "dragging" : "")} id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel} data-stream={this.props.stream.streamChannel}>
        <div className="overlay">
          <i onClick={() => this.props.removeStream(this.props.navChannel, this.props.stream.streamChannel)} className="fa fa-times" aria-hidden="true"></i>
          <div className="player-controls">
            <div>
              <i draggable="true" onMouseMove={this.onDrag.bind(this)} onMouseDown={this.dragStart.bind(this)} onMouseUp={this.dragStop.bind(this)} className="fa fa-arrows" aria-hidden="true"></i>
              <span className="control-text fa-arrows-text">Move</span>
              <i onClick={() => this.props.addChat(this.props.stream.streamChannel)} className="fa fa-commenting" aria-hidden="true"></i>
              <span className="control-text fa-commenting-text">Open Chat</span>
            </div>
          </div> 
        </div>  
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    width: ownProps.width,
    height: ownProps.height,
    order: ownProps.order,
    stream: ownProps.stream,
    navChannel: state.streams.activeChannel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStream: (channel, player) => {
      dispatch( loadStream(channel, player) )
    },
    addChat: (channel) => {
      dispatch ( addChat(channel) )
      dispatch ( {type: "TOGGLE_CHAT", toggle: false} )
    },
    removeStream: (navChannel, streamChannel) => {
      dispatch( removeStream(navChannel, streamChannel) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)