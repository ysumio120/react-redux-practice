import React from 'react'
import { connect } from 'react-redux'

import { getFavoriteByBookmark, postFavorite, deleteBookmark } from '../utils/helpers'
import { getBookmarks } from '../actions/bookmarkActions'

class ModalBookmark extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      savedFavorites: [],
      value: "",
      validName: true
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.modalOpen && this.props.modalOpen) {
      if(this.props.userLocal) 
        this.fetchFavorite();

      this.setState({value: this.props.bookmarkChannel, validName: true});
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
    const username = this.props.userLocal.name;
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

    if(streams.length > 0) {
      return (
        <div>
          <b>Channels Saved:</b>
          <ul>{streams}</ul>
        </div>
      )
    }

    return null;
  }

  getCurrentStreams() {
    const filteredStreams = this.props.streams.filter((stream) => {
      return stream.navChannel == this.props.bookmarkChannel;
    })

    const streams = filteredStreams.map(stream => {
      const id = this.props.bookmarkChannel + "--" + stream.streamChannel;

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

    if(streams.length > 0) {
      return (
        <div>
          <b>Currently Playing:</b>
          <ul>{streams}</ul>
        </div>
      )
    }

    return null;
  }

  onChangeHandler(e) {
    const bookmarks = this.props.bookmarks;
    const value = e.target.value.trim();
    for(let i = 0; i < bookmarks.length; i++)  {
      if(value != this.props.bookmarkChannel && value === bookmarks[i].bookmark.trim() || value === "") {
        this.setState({validName: false, value: e.target.value});
        break;
      }
      else 
        this.setState({validName: true, value: e.target.value})
    }
  }

  onDelete() {
    const toDelete = {
      bookmark: this.props.bookmarkChannel
    }

    if(this.props.userLocal) {
      deleteBookmark(this.props.userLocal.name, JSON.stringify(toDelete), (data) => {
        if(data) {
          this.props.fetchBookmarks(this.props.userLocal.name);
        }
      });
    }

    this.props.toggleModal(false, "");
  }

  onSubmit() {
    const list = this.list;

    const inputs = list.querySelectorAll("li > input");

    const toSubmit = {
      bookmark: this.props.bookmarkChannel,
      newName: this.state.value,
      streams: []
    }

    let noDuplicates = {};

    for(let i = 0; i < inputs.length; i++) {
      if(inputs[i].checked) {
        
        const channel_id = inputs[i].getAttribute("data-id");
        const channel = inputs[i].getAttribute("data-channel");
        
        noDuplicates[channel] = {
          channel_id: channel_id, 
          channel: channel
        };
      }
    }

    for(let channel in noDuplicates) {
      toSubmit.streams.push(noDuplicates[channel]);
    }

    console.log(toSubmit)

    console.log(JSON.stringify(toSubmit));

    if(this.props.userLocal) {
      postFavorite(this.props.userLocal.name, JSON.stringify(toSubmit), (data) => {
        if(data) {
          this.props.fetchBookmarks(this.props.userLocal.name);
        }
      });
    }

    this.props.toggleModal(false, "");

  }

  render() {
    const modalOpen = this.props.modalOpen ? "modal-show" : "modal-hide";

    const modalHeader = this.props.modalType == "add" ? 
                          "Add Bookmark" : "Update Bookmark";

    return (
      <div ref={list => this.list = list} className={"modal " + modalOpen}>
        <div className="modal-header">
          {modalHeader}
        </div>
        <div className="modal-content">
          <label htmlFor={"modal-input--" + this.props.bookmarkChannel}>{"Name: "}</label>
          <input type="text" 
            placeholder="Bookmark Name"  
            value={this.state.value}
            onChange={this.onChangeHandler.bind(this)}
          />
          <span className={this.state.validName ? "modal-error-hide" : "modal-error-show"}><i>{this.state.value ? "Already in use" : "Please enter a name"}</i></span>
          <div className="modal-instruction"><i>Check the following channels to add to bookmark</i></div>
          {this.getCurrentStreams()}
          {this.getSavedStreams()}
        </div>
        <div className="modal-footer">
          <div className="buttons">
            <button className={"btn-delete " + (this.props.modalType == "add" ? "btn-hide" : "")} onClick={this.onDelete.bind(this)}>Delete</button> 
            <button className="btn-save" onClick={this.onSubmit.bind(this)} disabled={!this.state.validName}>Save</button>
            <button className="btn-close" onClick={() => {this.props.toggleModal(false)}}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLocal: state.user.userLocal,
    streams: state.streams.streams,
    modalOpen: state.bookmarks.modalOpen,
    bookmarks: state.bookmarks.bookmarks,
    bookmarkChannel: state.bookmarks.bookmarkChannel,
    modalType: state.bookmarks.modalType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (toggle, modalType) => {
      dispatch( {type: "TOGGLE_MODAL", toggle, modalType} )
    },
    fetchBookmarks: (username) => {
      dispatch( getBookmarks(username) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBookmark)