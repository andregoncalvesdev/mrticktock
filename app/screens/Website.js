'use strict'

import React, { Component } from 'react'
import {
  View,
  WebView,
  Text,
  AlertIOS
} from 'react-native'
import ViewContainer from 'mrticktock/app/components/ViewContainer'

import { connect } from 'react-redux'

class Website extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: 'https://mrticktock.com/',
      login: this.props.login[0]
    }
  }

  render() {
    let injectedJS = `
      if(window.location.href === "https://mrticktock.com/") {
        $("body").append("<div style='position: fixed; top: 0; height: 100vh; width: 100vw; z-index: 999; background: rgb(29, 44, 77); display: flex; justify-content: center; align-items: center;'><h6 style='color: white'>Logging in..</h6></div>")
      }

      $('.login-link').click();

      setTimeout(
        function(){
          document.getElementById('log_in_form_user_email').value = "${this.state.login.email}";
          document.getElementById('log_in_form_user_password').value = "${this.state.login.password}";
          $('#log-in').click();
        }
      , 500);
    `

    return (
      <ViewContainer>
        <WebView
          ref="webview"
          source={ {uri: this.state.url} }
          automaticallyAdjustContentInsets={ false }
          scalesPageToFit={ true }
          javaScriptEnabled={ true }
          domStorageEnabled={ true }
          decelerationRate="normal"
          startInLoadingState={ true }
          injectedJavaScript={ injectedJS } />
      </ViewContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, null)(Website)
