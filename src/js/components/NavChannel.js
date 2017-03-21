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

  bookmark(e) {
    e.stopPropagation(); 

    this.props.setBookMark(this.props.channel);
    this.props.toggleModal(true);
    console.log(this.props.channel)
  }

  render() {
    const label = this.props.navCollapse ? this.props.channel.substring(0,1).toUpperCase() : this.props.channel 

    return (
        <li 
          onClick={() => this.props.setActiveChannel(this.props.channel)} 
          className={this.props.activeChannel == this.props.channel ? "active" : ""}
        >
          <i
            onClick={this.bookmark.bind(this)}
            onMouseEnter={this.onMouseEnter.bind(this)} 
            onMouseLeave={this.onMouseLeave.bind(this)} 
            className={this.state.bookmarkHover ? "fa fa-bookmark" : "fa fa-bookmark-o"}  
            aria-hidden="true"
          ></i>
          {label}
        </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeChannel: state.streams.activeChannel,
    channel: ownProps.channel,
    navCollapse: state.app.navCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChannel: (channelName) => {
      dispatch( {type: "SET_CHANNEL", navChannel: channelName} )
    },
    toggleModal: (toggle) => {
      dispatch( {type: "TOGGLE_MODAL", toggle} )
    },
    setBookMark: (channel) => {
      dispatch( {type: "SET_BOOKMARK_CHANNEL", channel} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavChannel)