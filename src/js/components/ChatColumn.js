import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 


class ChatColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.selected !== prevProps.selected)
      document.getElementById("chat-selector").value = this.props.selected;
  }

  getOptions() {
    const chatOptions = this.props.chats.map((chat) => {
      return <option value={chat}>{chat}</option>
    })

    return chatOptions;
  }

  loadChats() {
    const chats = this.props.chats.map((chat) => {

      let srcChat = "https://www.twitch.tv/" + chat + "/chat"

      return (
        <iframe 
          frameborder="0" 
          scrolling="no" 
          className={"chat " + (this.props.selected == chat ? "chat-selected" : "")} 
          src={srcChat}>
        </iframe>
      )
    })

    return chats;
  }

  onSelectHandler() {
    const selected = document.getElementById("chat-selector").value;
    this.props.setSelected(selected);
  }

  render() {
    const ifChatExist = () => {
      if(this.props.chats.length > 0)
        return (<select id="chat-selector" onChange={this.onSelectHandler.bind(this)}>{this.getOptions()}</select>)
      else {
        return (
          <div className="empty-chat">
            <div className="chat-instructions">
              <p><b>Chat</b></p>
              <p>Start any stream and click on "<span><i className="fa fa-commenting" aria-hidden="true"></i></span>" along the bottom of the stream to open chat</p>
              <p>When opening multiple chats, a dropdown is available at the top to select through current chats</p>
            </div>
          </div>
        )
      }
    }

    return (
      <div id="chat-col" className={this.props.chatCollapse ? "chat-close" : "chat-open"}>
        {ifChatExist()}
        {this.loadChats()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected: state.chats.selected,
    chats: state.chats.chats,
    chatCollapse: state.app.chatCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelected: (channel) => {
      dispatch( {type: "SET_SELECTED", channel: channel} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatColumn)