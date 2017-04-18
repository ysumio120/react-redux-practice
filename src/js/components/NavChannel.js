import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class NavChannel extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      bookmarkHover: false
    }
  }

  onMouseEnter(e) {
    e.stopPropagation();
    this.setState({bookmarkHover: true});
  }

  onMouseLeave(e) {
    e.stopPropagation();
    this.setState({bookmarkHover: false});
  }

  removeChannel(e) {
    e.stopPropagation();
    this.props.removeChannel(this.props.channel);
  }

  addBookmark(e) {
    e.stopPropagation(); 

    this.props.setBookMark(this.props.channel);
    this.props.toggleModal(true, 'add');
    console.log(this.props.channel)
  }

  isBookmarked() {
    for(let i = 0; i < this.props.bookmarks.length; i++) {
      if(this.props.bookmarks[i].bookmark == this.props.channel) {
        return (
          <div>
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
        )
      }
    }

    return (
      <div>  
        <i
          onClick={this.addBookmark.bind(this)}
          onMouseEnter={this.onMouseEnter.bind(this)} 
          onMouseLeave={this.onMouseLeave.bind(this)} 
          className={this.state.bookmarkHover ? "fa fa-bookmark" : "fa fa-bookmark-o"}  
          aria-hidden="true"
        ></i>
      </div>
    )
  }

  render() {
    const label = this.props.navCollapse ? this.props.channel.substring(0,1).toUpperCase() : this.props.channel 

    const close = this.props.channel != "Home" ? 
                    <i className="fa fa-times-circle" onClick={this.removeChannel.bind(this)} aria-hidden="true"></i> 
                      : null;
    return (
        <li 
          onClick={() => this.props.setActiveChannel(this.props.channel)} 
          className={this.props.activeChannel == this.props.channel ? "active" : ""}
        >
          {this.isBookmarked()}
          {label}
          {close}
        </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeChannel: state.streams.activeChannel,
    channel: ownProps.channel,
    navCollapse: state.app.navCollapse,
    bookmarks: state.bookmarks.bookmarks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChannel: (channelName) => {
      dispatch( {type: "SET_CHANNEL", navChannel: channelName} )
    },
    removeChannel: (channelName) => {
      dispatch( {type: "REMOVE_CHANNEL", navChannel: channelName} )
    },
    toggleModal: (toggle, modalType) => {
      dispatch( {type: "TOGGLE_MODAL", toggle, modalType} )
    },
    setBookMark: (channel) => {
      dispatch( {type: "SET_BOOKMARK_CHANNEL", channel} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavChannel)