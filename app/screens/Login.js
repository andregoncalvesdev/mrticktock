'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  NativeModules,
  AlertIOS,
  NativeAppEventEmitter,
  AsyncStorage,
  Navigator,
  Animated
} from 'react-native'
import ViewContainer from 'mrticktock/app/components/ViewContainer'
import StyleVars from 'mrticktock/app/styles/StyleVars'
import loginStyle from 'mrticktock/app/styles/Login'
import Button from 'apsl-react-native-button'
import ApiManager from 'mrticktock/app/api/ApiManager'

import { assignTasks, storeActiveTask, storeLogin } from 'mrticktock/app/actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create(loginStyle)

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null,
      loginText: "Log in",
      tasksReady: false,
      activeTaskReady: false
    }
  }

  render() {
    return (
      <ViewContainer>
        <View style={ styles.innerContainer }>
          <Image
            source={ require("mrticktock/app/images/logo-big.png") }
            style={ styles.logo }
            maintainAspectRatio={true}/>

          <View style={ styles.inputContainer }>
            <TextInput
              placeholder="Email"
              placeholderTextColor={ StyleVars.Colors.white }
              keyboardType="email-address"
              selectionColor="white"
              style={ styles.input }
              autoFocus={ false }
              autoCapitalize="none"
              autoCorrect={ false }
              onChangeText={ (email) => this.setState({email: email}) }
              returnKeyType="next"
              onSubmitEditing={ () => this._passwordRef.focus() }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              ref={ (ref) => this._passwordRef = ref }
              placeholder="Password"
              placeholderTextColor={ StyleVars.Colors.white }
              secureTextEntry={ true }
              selectionColor="white"
              style={ styles.input }
              autoCapitalize="none"
              autoCorrect={ false }
              onChangeText={(password) => this.setState({password: password}) }
            />
          </View>

          <TouchableOpacity style={ styles.loginButtonContainer }>
            <Button
              style={ styles.loginButton }
              textStyle={ {color: StyleVars.Colors.white} }
              onPress={ () => this.submitForm() }>
              { this.state.loginText }
            </Button>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    )
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

  storeActiveTask(login) {
    const self = this
    let isTimerActivePromise = ApiManager.isTimerActive(login)

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

  getTasks(login) {
    const self = this
    let tasksPromise = ApiManager.getTasks(login)

    tasksPromise.then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          if (!data.errors.length) {
            //store login
            self.props.storeLogin(login)
            AsyncStorage.setItem("auth", "true")
            AsyncStorage.setItem("login", JSON.stringify(login))

            //store tasks
            self.props.assignTasks(data.content)
            self.setState({tasksReady: true})
            self.checkReadyState()
          } else {
            self.setState({ loginText: 'Log In'})
            AlertIOS.alert('Error', 'Invalid credentials')
          }
        })
      }
    })
  }

  submitForm() {
    this.setState({ loginText: 'Logging In'})

    let login = {
      email: this.state.email,
      password: this.state.password
    }

    this.getTasks(login)
    this.storeActiveTask(login)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ assignTasks, storeActiveTask, storeLogin }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
