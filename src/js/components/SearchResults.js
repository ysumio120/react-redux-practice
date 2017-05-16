import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import ScrollWrapper from 'react-customized-scrollbar'

import StreamItem from './StreamItem'

import { fetchStreamsByQuery } from '../actions/searchActions'

class SearchResults extends React.Component {
  
  constructor(props) {
    super(props);
  }

  streamsList() {
    const streamsList = this.props.streams.map((stream) => {
      return <StreamItem key={stream._id} stream={stream}/>
    })

    return <ul>{streamsList}</ul>
  }

  onClickHandler(e) {
    e.stopPropagation();
    this.props.toggleSearch(true);
  }

  render() {
    const classes = "streams-list list-results search-results " + (this.props.query && this.props.searchCollapse ? "" : "search-results-close");
    const extend = this.props.chatCollapse ? "right-extend " : "";

    return (
      <div id="search-results" className={classes + " " + extend} onClick={this.onClickHandler.bind(this)}>
        <ScrollWrapper     
          wrapperStyle={{width: "100%", height: "100%", overflow: "hidden"}}
          verticalScrollStyle={{borderRadius: "5px", backgroundColor: "black"}}
          horizontalScrollStyle={{borderRadius: "6.5px", backgroundColor: "black"}}
          verticalTrackStyle={{borderRadius: "5px", backgroundColor: "lightgrey"}}
          horizontalTrackStyle={{marginTop: "-10px", borderRadius: "5px", backgroundColor: "lightgrey"}}
          wrapperClassNames={"wrapper"}
          verticalScrollClassNames={"scrollbar-vertical"}
          horizontalScrollClassNames={"scrollbar-horizontal"}
          verticalTrackClassNames={"track-vertical"}
          horizontalTrackClassNames={"track-horizontal"}
          minVerticalLength={50}
          minHorizontalLength={50}
          verticalThickness={"10px"}
          horizontalThickness={"13px"}
          //stayVisible={false}
          //fadeInDuration={700}
          //fadeOutDuration={600}
          //autoFadeOut={300}
          //offsetScroll={true}
          autoUpdate={true}
        >

          {this.streamsList()}

        </ScrollWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navCollapse: state.app.navCollapse,
    chatCollapse: state.app.chatCollapse,
    searchCollapse: state.app.searchCollapse,
    query: state.search.query,
    streams: state.search.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSearch: (toggle) => {
      dispatch( {type: "TOGGLE_SEARCH", toggle} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)