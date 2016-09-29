'use strict'

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Navigator } from 'react-native'

import AppInit from 'mrticktock/app/boot/AppInit'
import Login from 'mrticktock/app/screens/Login'
import SideMenu from 'react-native-side-menu'
import Menu from 'mrticktock/app/components/Menu'
import Tasks from 'mrticktock/app/screens/Tasks'
import TaskShow from 'mrticktock/app/screens/TaskShow'
import Website from 'mrticktock/app/screens/Website'
import Reminder from 'mrticktock/app/screens/Reminder'

class AppNavigator extends Component {
  _renderScene(route, navigator) {
    let globalNavigatorProps = { navigator }
    const menu = <Menu { ...globalNavigatorProps } />

    switch (route.ident) {
      case "AppInit":
        return (
          <AppInit { ...globalNavigatorProps } />
        )

      case "Login":
        return (
          <Login { ...globalNavigatorProps } />
        )

      case "Tasks":
        return (
          <SideMenu menu={ menu } openMenuOffset={ 120 }>
            <Tasks { ...globalNavigatorProps } />
          </SideMenu>
        )

      case "TaskShow":
        return (
          <TaskShow { ...globalNavigatorProps } />
        )

      case "Website":
        return (
          <SideMenu menu={ menu } openMenuOffset={ 120 }>
            <Website { ...globalNavigatorProps } />
          </SideMenu>
        )

      case "Reminder":
        return (
          <SideMenu menu={ menu } openMenuOffset={ 120 }>
            <Reminder { ...globalNavigatorProps } />
          </SideMenu>
        )

      default:
        return (
          <AppInit { ...globalNavigatorProps } />
        )
    }
  }

  render() {
    return(
      <Navigator
        initialRoute={ this.props.initialRoute }
        ref="appNavigator"
        renderScene={ this._renderScene }
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
        })} />
    )
  }
}

module.exports = AppNavigator
