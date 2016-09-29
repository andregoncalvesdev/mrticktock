import React, { Component } from 'react'
import { AppState, AlertIOS } from 'react-native'
import PushNotification from 'react-native-push-notification'

class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        if (AppState.currentState == 'active') {}
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      requestPermissions: true
    })
  }

  render() {
    return null
  }
}

module.exports = PushController
