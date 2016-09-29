import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StatusBar
} from 'react-native'

import AppNavigator from 'mrticktock/app/navigation/AppNavigator'
import AppInit from 'mrticktock/app/boot/AppInit'

import StyleVars from 'mrticktock/app/styles/StyleVars'
import StatusBarBackground from 'mrticktock/app/components/StatusBarBackground'

import { Provider } from 'react-redux'
import reducers from 'mrticktock/app/reducers'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import ViewContainer from 'mrticktock/app/components/ViewContainer'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class mrticktock extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <ViewContainer>
          <StatusBarBackground style={{ backgroundColor: StyleVars.Colors.white }} />
          <AppNavigator initialRoute={{ ident: "AppInit" }} />
        </ViewContainer>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('mrticktock', () => mrticktock);
