import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { fetchStreams } from '../actions/searchActions'
import * as userActions from '../actions/userActions'

class User extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      localUser: null
    }
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

  componentDidMount() {
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
      this.props.getTwitchUser(token);
    }

    else if(queryObj.code) {
      this.props.getToken(queryObj.code);

    }
    else {
      this.props.setTwitchUser(null);
      this.props.setLocalUser(null, false);
    }
  }

  componentWillReceiveProps(nextProps) {
     // console.log(this.props)
     // console.log(nextProps)
    if(this.props.loggingIn && !this.props.userTwitch && nextProps.userTwitch) {
      this.props.getLocalUser({name: nextProps.userTwitch.name})
    }

    if(this.props.token != nextProps.token) {
      localStorage.setItem("accessToken", nextProps.token);
      if(nextProps.token)
        this.props.getTwitchUser(nextProps.token);
    }

  }

  buildQuery(headers) {
    let params = [];
    for(let key in headers) {
      if(headers[key] !== null && headers[key] !== undefined)
        params.push(key + '=' + headers[key]);
    }

    return encodeURI(params.join('&'));
  }

  login() {
    const client_id = location.hostname == "localhost" ? "kw4mh30kbtoewy0b9dh0mmyrt38r56" : "tgasid8neghal59b29g0hpjg8xt3gu" 
    const redirect_uri = location.hostname == "localhost" ? "http://localhost:8080" : "https://twitch-avid.herokuapp.com" 

    const headers = {
      response_type: "code",
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: "user_read channel_read user_follows_edit",
      force_verify: "true"
    };
    
    const params = this.buildQuery(headers);
    location.href = "https://api.twitch.tv/kraken/oauth2/authorize?" + params;  
  }

  isLoggedIn() {
    if(this.props.userLocal && this.props.isLoggedIn && !this.props.loggingIn)
      return (
        <div id="user">
          <img className="profile-logo" src={this.props.userTwitch.logo ? this.props.userTwitch.logo : "/src/images/profile_default.jpg"} />
          <div className="user-info">  
            {this.props.userTwitch.display_name}
            <button className="logout-btn" onClick={this.props.logoutUser}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
          </div>
        </div>
      )
    else if(!this.props.loggingIn) {
      if(!this.props.navCollapse)
        return <img onClick={this.login.bind(this)} src="http://ttv-api.s3.amazonaws.com/assets/connect_light.png" className="twitch-connect"/>
      else
        return (
          <button onClick={this.login.bind(this)} className="sm-login-btn">
            <div>
              <img src="/src/images/twitch_logo.PNG" />
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            </div>
          </button>
        )
    }
  }

  render() {
    return (
      <div id="user-wrapper">
        {this.isLoggedIn()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggingIn: state.user.loggingIn,
    isLoggedIn: state.user.isLoggedIn,
    token: state.user.token,
    userTwitch: state.user.userTwitch,
    userLocal: state.user.userLocal,
    navCollapse: state.app.navCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch( userActions.setToken(token) );
    },
    getToken: (code) => {
      dispatch( userActions.getToken(code) );
    },
    setTwitchUser: (user) => {
      dispatch( userActions.setTwitchUser(user) );
    },
    setLocalUser: (user, loggingIn) => {
      dispatch( userActions.setLocalUser(user, loggingIn) );
    },
    getTwitchUser: (token) => {
      dispatch( userActions.setToken(token) );
      dispatch( userActions.getTwitchUser(token) );
    },
    getLocalUser: (user) => {
      //dispatch( user.setToken(token) );
      dispatch( userActions.getLocalUser(user) );
    },
    logoutUser: () => {
      const redirect_uri = location.hostname == "localhost" ? "http://localhost:8080" : "https://twitch-avid.herokuapp.com";
      localStorage.removeItem("accessToken");
      location.href = redirect_uri
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)