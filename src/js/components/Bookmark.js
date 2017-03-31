import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Bookmark extends React.Component {
  
  constructor(props) {
    super(props);
  }

  addToList(e) {
    const bookmark = this.props.bookmark.bookmark;

    for(let i = 0; i < this.props.navChannels.length; i++) {
      if(this.props.navChannels[i] == bookmark) {
        return this.props.setActiveChannel(bookmark);
      }  
    }

    this.props.setActiveChannel(bookmark);
    this.props.addChannel(bookmark);
  }

  updateBookmark(e) {
    e.stopPropagation(); 

    this.props.setBookMark(this.props.bookmark.bookmark);
    this.props.toggleModal(true, 'update');
    console.log(this.props.channel)
  }

  render() {
    return (
        <li onClick={this.addToList.bind(this)}>
          {this.props.bookmark.bookmark}
          <div><i className="fa fa-cog" aria-hidden="true" onClick={this.updateBookmark.bind(this)}></i></div>
        </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: ownProps.bookmark,
    navChannels: state.streams.navChannels
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChannel: (channelName) => {
      dispatch( {type: "ADD_CHANNEL", channel: channelName} )
    },
    setActiveChannel: (channelName) => {
      dispatch( {type: "SET_CHANNEL", navChannel: channelName} )
    },
    toggleModal: (toggle, modalType) => {
      dispatch( {type: "TOGGLE_MODAL", toggle, modalType} )
    },
    setBookMark: (channel) => {
      dispatch( {type: "SET_BOOKMARK_CHANNEL", channel} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark)