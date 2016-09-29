'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Navigator,
  Image
} from 'react-native'

import menuStyle from 'mrticktock/app/styles/Menu'

import { storeLogin } from 'mrticktock/app/actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create(menuStyle)

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isTasks: "Tasks" == props.navigator.getCurrentRoutes().pop().ident,
      isReminder: "Reminder" == props.navigator.getCurrentRoutes().pop().ident
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.backgroundWrapper }>
          <Image
            source={ require("mrticktock/app/images/logo-big.png") }
            style={ styles.backgroundLogo }
            resizeMode={ Image.resizeMode.sretch }/>
        </View>

        { this.state.isTasks ? <View></View> :
          <TouchableOpacity onPress={ () => this.goToTasks() }>
            <Text style={ styles.menuItem }>
            Tasks
            </Text>
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={ () => this.goToWebsite() }>
          <Text style={ styles.menuItem }>
            Website
          </Text>
        </TouchableOpacity>

        { this.state.isReminder ? <View></View> :
          <TouchableOpacity onPress={ () => this.goToReminder() }>
            <Text style={ styles.menuItem }>
              Reminder
            </Text>
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={ () => this.logout() }>
          <Text style={ styles.menuItem }>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  logout() {
    let login = {'email': '', 'password': ''}

    this.props.storeLogin(login)

    AsyncStorage.setItem("auth", "false")
    AsyncStorage.setItem("login", JSON.stringify(login))

    this.props.navigator.push({
      ident: "Login",
      sceneConfig: {
        ...Navigator.SceneConfigs.FadeAndroid,
        gestures: {}
      }
    })
  }

  goToTasks() {
    this.props.navigator.push({
      ident: "Tasks",
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    })
  }

  goToReminder() {
    this.props.navigator.push({
      ident: "Reminder",
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    })
  }

  goToWebsite() {
    this.props.navigator.push({
      ident: "Website",
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeLogin }, dispatch)
}

export default connect(null, mapDispatchToProps)(Menu)
