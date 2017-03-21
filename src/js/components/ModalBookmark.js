import React from 'react'
import { connect } from 'react-redux'

import { postFavorite } from '../utils/helpers'

class ModalBookmark extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const inputs = this.list.querySelectorAll("li > input");

    for(let i = 0; i < inputs.length; i++) { // Check every checkbox when modal opens
      inputs[i].checked = true;
    }
  }

  getCurrentStreams() {
    const filteredStreams = this.props.streams.filter((stream) => {
      return stream.navChannel == this.props.bookmarkChannel;
    })

    const streams = filteredStreams.map(stream => {
      return (
        <li key={stream.streamChannel}>
          <input type="checkbox" 
            data-id={stream.streamChannelID} 
            data-channel={stream.streamChannel} 
            value={stream.streamChannel} 
          /> {stream.streamChannel}
        </li>
      )
    })

    return streams;
  }

  onSubmit() {
    const list = this.list;

    const inputs = list.querySelectorAll("li > input");

    const obj = {
      bookmark: this.props.bookmarkChannel,
      streams: []
    }

    for(let i = 0; i < inputs.length; i++) {
      if(inputs[i].checked) {
        obj.streams.push({
          channel_id: inputs[i].getAttribute("data-id"), 
          channel: inputs[i].getAttribute("data-channel")
        });
      }
    }

    console.log(obj)

    console.log(JSON.stringify(obj));

    postFavorite(this.props.user.name, JSON.stringify(obj), (data) => {
      console.log(data);
    })
  }

  render() {
    const modalOpen = this.props.modalOpen ? "modal-show" : "modal-hide";

    return (
      <div className={"modal " + modalOpen}>
        <h1>{this.props.bookmarkChannel} </h1>
        <ul ref={list => this.list = list} >
          {this.getCurrentStreams()}
        </ul>
        <button onClick={this.onSubmit.bind(this)}>Submit</button>
        <button onClick={() => {this.props.toggleModal(false)}}>Close</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    streams: state.streams.streams,
    modalOpen: state.app.modalOpen,
    bookmarkChannel: state.app.bookmarkChannel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (toggle) => {
      dispatch( {type: "TOGGLE_MODAL", toggle: toggle} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBookmark)