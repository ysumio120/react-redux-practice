import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import ScrollWrapper from 'react-customized-scrollbar'

//import ScrollWrapper from './ScrollWrapper'

import Search from './Search'
import NavMenu from './NavMenu'
import User from './User'
import NavChannelsList from './NavChannelsList'
import BookmarkList from './BookmarkList'

class NavColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const header = this.props.navCollapse ? "TA" : "TwitchAvid";

    return (
      <div id="nav-col" className={this.props.navCollapse ? "nav-close" : "nav-open"}>
        <ScrollWrapper     
          wrapperStyle={{width: "100%", height: "100%", overflow: "hidden"}}
          verticalScrollStyle={{borderRadius: "3px", backgroundColor: "lightgrey"}}
          horizontalScrollStyle={{borderRadius: "6.5px", backgroundColor: "lightgrey"}}
          verticalTrackStyle={{borderRadius: "4px", backgroundColor: "transparent"}}
          //horizontalTrackStyle={{borderRadius: "5px", backgroundColor: "none"}}
          wrapperClassNames={"wrapper"}
          verticalScrollClassNames={"scrollbar-vertical"}
          horizontalScrollClassNames={"scrollbar-horizontal"}
          verticalTrackClassNames={"track-vertical"}
          horizontalTrackClassNames={"track-horizontal"}
          minVerticalLength={50}
          minHorizontalLength={50}
          verticalThickness={"6px"}
          horizontalThickness={"13px"}
          stayVisible={false}
          fadeInDuration={700}
          fadeOutDuration={600}
          autoFadeOut={300}
          //offsetScroll={true}
          autoUpdate={true}
        >
          <div className={this.props.navCollapse ? "nav-close" : "nav-open"}>
            <h1>{header}</h1>
            <User />
            <Search />
            <NavMenu />
            <NavChannelsList />
            <BookmarkList />
          </div>
        </ScrollWrapper>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navCollapse: state.app.navCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavColumn)