import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { getAllFavorite } from '../utils/helpers'
import { getBookmarks } from '../actions/bookmarkActions'

class BookmarkList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    }
  }

  componentDidMount() {
    // getAllFavorite(this.props.user.name, (data) => {
    //   this.setState({bookmarks: data})
    // })
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.userLocal && nextProps.userLocal) {
      this.props.fetchBookmarks(nextProps.userLocal.name)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.bookmarks.length != this.props.bookmarks.length) {
      const li_Node = this.list.querySelector("li");
      const li_NodeHeight = li_Node.offsetHeight;
      this.setState({listHeight: this.props.bookmarks.length * li_NodeHeight})
    }
  }

  addToList(bookmark) {
    for(let i = 0; i < this.props.navChannels.length; i++) {
      if(this.props.navChannels[i] == bookmark) {
        return this.props.setActiveChannel(bookmark);
      }  
    }

    this.props.setActiveChannel(bookmark);
    this.props.addChannel(bookmark);

  }

  displayBookmarks() {
    const bookmarks = this.props.bookmarks.map((bookmark) => {
      return (         
        <li 
        key={"bookmark--" + bookmark.bookmark}
        onClick={() => this.addToList(bookmark.bookmark)} 
        className={"test"}
        >
        {bookmark.bookmark}
        </li>
      )
    })

    return bookmarks;
  }

  toggleBookmarks() {
    this.setState({collapse: !this.state.collapse});
  }

  render() {
    const height = this.state.collapse ? 0 : this.state.listHeight;

    const style = {
      height: height + "px"
    }

    return (
      <div id="bookmarks" className="nav-list">
        <div className="nav-header">
          <span>BOOKMARKS</span>
          <i onClick={this.toggleBookmarks.bind(this)} className={this.state.collapse ? "fa fa-chevron-down" : "fa fa-chevron-up"} aria-hidden="true"></i>
        </div>
        <ul style={style} ref={list => {this.list = list}}>{this.displayBookmarks()}</ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLocal: state.user.userLocal,
    bookmarks: state.bookmarks.bookmarks,
    navChannels: state.streams.navChannels
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookmarks: (username) => {
      dispatch( getBookmarks(username) )
    },
    addChannel: (channelName) => {
      dispatch( {type: "ADD_CHANNEL", channel: channelName} )
    },
    setActiveChannel: (channelName) => {
      dispatch( {type: "SET_CHANNEL", navChannel: channelName} )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList)