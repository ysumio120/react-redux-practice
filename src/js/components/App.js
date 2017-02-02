import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { fetchStreams } from '../actions/searchActions'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.timer;
  }

  onChangeHandler(e) {
    e.persist();
    if(this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.searchStreams(e.target.value);
    }, 500)
  }

  streamList() {
    const streams = this.props.streams.map(stream => {
      return <li>{stream.channel.display_name}</li>
    })

    if(streams.length > 0)
      return <ul>{streams}</ul>
  }

  render() {
    return (
      <div>
        <h1>{this.props.query}</h1>
        <input type="text" placeholder="Search" onChange={this.onChangeHandler.bind(this)}/>
        
        {this.props.query ? this.streamList() : []}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    query: store.search.query,
    streams: store.search.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchStreams: (query) => {
      dispatch( fetchStreams(query) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)