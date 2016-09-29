'use strict'

import React, { Component } from 'react'
import { StyleSheet,
  Text,
  View,
  PickerIOS,
  TouchableOpacity,
  NativeAppEventEmitter,
  NativeModules,
  AlertIOS
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import ApiManager from 'mrticktock/app/api/ApiManager'

import ViewContainer from 'mrticktock/app/components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'apsl-react-native-button'
import taskShowStyle from 'mrticktock/app/styles/TaskShow'
import Helpers from 'mrticktock/app/helpers/Helpers'

import StyleVars from 'mrticktock/app/styles/StyleVars'
const styles = StyleSheet.create(taskShowStyle)

const PickerItemIOS = PickerIOS.Item

const hours = [
  0, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24
]

const minutes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 42, 43, 44, 45, 46,
  47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58, 59, 60
]

class TaskShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      task: this.props.taskShow,
      hours: 8,
      minutes: 10,
      setTimeButtonText: "Set Time",
      totalTime: '--:--'
    }
  }

  componentWillMount() {
    let getTaskDetailsPromise = ApiManager.getTaskDetails(this.props.login[0], this.props.taskShow.id)
    let self = this

    getTaskDetailsPromise.then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          if (!data.errors.length) {
            self.setState({
              totalTime: data.content.total_time
            })
          }
        })
      }
    })
  }

  render() {
    return (
      <ViewContainer>
        <TouchableOpacity
          style={ styles.backButtonContainer }
          onPress={ () => this.back()}>
          <Icon name="chevron-left" style={ styles.backIcon }/>
          <Text style={{ color: StyleVars.Colors.white }}>
            Back
          </Text>
        </TouchableOpacity>

        <View style={ styles.taskNameContainer}>
          <Text style={ styles.taskName }>{ this.state.task.task_name }</Text>
          <Text style={ styles.taskTotalTime }>Total Time: { this.state.totalTime }</Text>
        </View>

        <View style={ styles.wrapper }>
          <View style={ styles.column }>
            <Text style={ styles.title }>Hours</Text>
            <PickerIOS
              itemStyle={ styles.itemStyle }
              selectedValue={this.state.hours}
              onValueChange={(selectedHours) => this.setState({hours: selectedHours})}>
            {
              hours.map((hour, index) => (
                <PickerItemIOS
                    key={index}
                    value={index}
                    label={index + ''}
                />
              ))
            }
            </PickerIOS>
          </View>

          <View style={ styles.column }>
            <Text style={ styles.title }>Minutes</Text>
            <PickerIOS
              itemStyle={ styles.itemStyle }
              selectedValue={this.state.minutes}
              onValueChange={(selectedMinutes) => this.setState({minutes: selectedMinutes})}>
            {
              minutes.map((minute, index) => (
                <PickerItemIOS
                    key={index}
                    value={index}
                    label={index + ''}
                />
              ))
            }
            </PickerIOS>
          </View>
        </View>

        <TouchableOpacity style={ styles.setTimeButtonContainer }>
          <Button
            style={ styles.setTimeButton }
            textStyle={ {color: StyleVars.Colors.white} }
            onPress={ () => this.setTime()}>
            { this.state.setTimeButtonText }
          </Button>
        </TouchableOpacity>
      </ViewContainer>
    )
  }

  back() {
    this.props.navigator.pop()
  }

  setTime() {
    this.setState({ setTimeButtonText: 'Setting Time ..'})

    let hours = this.state.hours
    let minutes = this.state.minutes

    if (this.state.hours < 10) {
      hours = '0' + hours
    }

    if (this.state.minutes < 10) {
      minutes = '0' + minutes
    }

    let time = hours + ':' + minutes
    let todayDate = Helpers.getTodayDate()

    let reportTimeOnTaskPromise = ApiManager.reportTimeOnTask(this.props.login[0], this.state.task.id, time, todayDate)
    let self = this

    reportTimeOnTaskPromise.then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          if (!data.errors.length) {
            self.setState({ setTimeButtonText: 'Time Saved'})

            self.setState({ totalTime: time})

            setTimeout(() => {
              self.back()
            }, 1000)
          } else {
            AlertIOS.alert('Error', 'Cannot report time on an active task.')
            self.setState({ setTimeButtonText: 'Set Time'})
          }
        })
      }
    })
  }
}

function mapStateToProps(state) {
  return {
    taskShow: state.taskShow[0],
    login: state.login
  }
}

export default connect(mapStateToProps, null)(TaskShow)
