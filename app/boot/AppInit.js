'use strict'

import React, { Component } from 'react'
import { AppRegistry, View, Navigator, AsyncStorage, Text, StyleSheet } from 'react-native'

import ApiManager from 'mrticktock/app/api/ApiManager'

import Spinner from 'react-native-spinkit'
import appInitStyle from 'mrticktock/app/styles/AppInit'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { assignTasks, storeActiveTask, storeLogin } from 'mrticktock/app/actions/index'

const styles = StyleSheet.create(appInitStyle)

class AppInit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksReady: false,
      activeTaskReady: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('auth').then((value) => {
      const self = this

      if (value === "true") { //if is auth
        //navegar para tasks
        AsyncStorage.getItem('login').then((login) => {
          let loginObj = JSON.parse(login)

          self.props.storeLogin(loginObj)
          self.getTasks(loginObj)
          self.storeActiveTask(loginObj)
        })
      } else { //not auth
        //navegar para Login
        self.props.navigator.push({
          ident: "Login",
          sceneConfig: {
            ...Navigator.SceneConfigs.FadeAndroid,
            gestures: {}
          }
        })
      }
    })
  }

  checkReadyState() {
    if (this.state.tasksReady && this.state.activeTaskReady) {
      this.props.navigator.push({
        ident: "Tasks",
        sceneConfig: {
          ...Navigator.SceneConfigs.FadeAndroid,
          gestures: {}
        }
      })
    }
  }

  getTasks(loginObj) {
    const self = this
    let tasksPromise = ApiManager.getTasks(loginObj)

    tasksPromise.then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          if (!data.errors.length) {
            //store tasks
            self.props.assignTasks(data.content)
            self.setState({tasksReady: true})
            self.checkReadyState()
          }
        })
      }
    })
  }

  storeActiveTask(loginObj) {
    const self = this
    let isTimerActivePromise = ApiManager.isTimerActive(loginObj)

    isTimerActivePromise.then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          if (!data.errors.length && data.content[0].hasOwnProperty('task_id')) {
            self.props.storeActiveTask(data.content[0])
          }

          self.setState({activeTaskReady: true})
          self.checkReadyState()
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          isVisible={true}
          size={80}
          type={'ThreeBounce'}
          color={'#FFFFFF'}
        />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ assignTasks, storeActiveTask, storeLogin }, dispatch)
}

export default connect(null, mapDispatchToProps)(AppInit)
