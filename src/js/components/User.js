import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { fetchStreams } from '../actions/searchActions'
import * as user from '../actions/userActions'

console.log(user)
class User extends React.Component {
  
  constructor(props) {
    super(props);
  }

  parseQueryString(query) {
    const decodeQuery = decodeURI(query);
    //console.log(decodeQuery);
    const keys_values = query.split("&");
    //console.log(keys_values);
    let queryObj = {};

    for(let param of keys_values) {
      let splitKeyValue = param.split("=");
      //console.log(splitKeyValue);
      queryObj[splitKeyValue[0]] = splitKeyValue[1];
    }

    return queryObj;
  }

  componentWillMount() {
    let token = localStorage.getItem("accessToken");
    //console.log(token);

    let query = window.location.search.substring(1);
    let queryObj = this.parseQueryString(query);
    //console.log(queryObj);

    if(queryObj.error == "access_denied") {
      localStorage.removeItem("accessToken");
      window.location = "http://" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    }

    else if(token && token !== "null") {
      this.props.getUser(token);
    }

    else if(queryObj.code) {
      console.log("here code")
      this.props.getToken(queryObj.code);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
    if(this.props.token != nextProps.token) {
      localStorage.setItem("accessToken", nextProps.token);
      if(nextProps.token)
        this.props.getUser(nextProps.token);
    }

  }

  isLoggedIn() {
    if(this.props.user && this.props.isLoggedIn)
      return (
        <span>
          <img className="profile-logo" src={this.props.user.logo ? this.props.user.logo : "src/images/profile_default.jpg"} />
          {this.props.user.display_name}
          <button onClick={this.props.logoutUser}>Logout</button>
        </span>
      )
    else
      return <a href='/login'> Connect to Twitch </a>
  }

  render() {
    return (
      <div>
        {this.isLoggedIn()}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.user.isLoggedIn,
    token: store.user.token,
    user: store.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch( user.setToken(token) );
    },
    getToken: (code) => {
      dispatch( user.getToken(code) );
    },
    getUser: (token) => {
      dispatch( user.setToken(token) );
      dispatch( user.getUser(token) );
    },
    logoutUser: () => {
      localStorage.removeItem("accessToken");
      dispatch( user.setToken("") );
      dispatch( user.setUser(null, false) );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)