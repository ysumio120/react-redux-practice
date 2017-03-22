import React from 'react'
import { connect } from 'react-redux'

import { getFavoriteByBookmark, postFavorite } from '../utils/helpers'

class ModalBookmark extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      savedFavorites: []
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.modalOpen && this.props.modalOpen) {
      this.fetchFavorite();
    }

    this.markCheckboxes();
  }

  markCheckboxes() {
    const inputs = this.list.querySelectorAll("ul > li > input");

    for(let i = 0; i < inputs.length; i++) { // Check every checkbox when modal opens
      inputs[i].checked = true;
    }
  }

  fetchFavorite() {
    const username = this.props.user.name;
    const bookmark = this.props.bookmarkChannel;

    getFavoriteByBookmark(username, bookmark, (data) => {
      this.setState({savedFavorites: data.streams});
    })
  }

  getSavedStreams() {
    const streams = this.state.savedFavorites.map(stream => {
      const id = this.props.bookmarkChannel + "--saved--" + stream.channel
      return (
        <li key={id}>
          <input type="checkbox"
            id={id} 
            data-id={stream.channel_id} 
            data-channel={stream.channel} 
            value={stream.channel} 
          /> 
          <label htmlFor={id}>{stream.channel}</label>
        </li>
      )
    })

    return streams;
  }

  getCurrentStreams() {
    const filteredStreams = this.props.streams.filter((stream) => {
      return stream.navChannel == this.props.bookmarkChannel;
    })

    const streams = filteredStreams.map(stream => {
      const id = this.props.bookmarkChannel + "--" + stream.streamChannel

      return (
        <li key={id}>
          <input type="checkbox"
            id={id} 
            data-id={stream.streamChannelID} 
            data-channel={stream.streamChannel} 
            value={stream.streamChannel} 
          /> 
          <label htmlFor={id}>{stream.streamChannel}</label>
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

    const currentStreams = this.getCurrentStreams();

    return (
      <div ref={list => this.list = list} className={"modal " + modalOpen}>
        <h3>{this.props.bookmarkChannel}</h3>
        <div><i>{currentStreams.length > 0 ? "Currently playing:" : "Currently playing: N/A"}</i></div>
        <ul>
          {currentStreams}
        </ul>
        <div><i>Previously saved:</i></div>
        <ul>
          {this.getSavedStreams()}
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