'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PickerIOS,
  Switch,
  Navigator,
  AsyncStorage
} from 'react-native'

import ViewContainer from 'mrticktock/app/components/ViewContainer'
import reminderStyle from 'mrticktock/app/styles/Reminder'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'apsl-react-native-button'
import StyleVars from 'mrticktock/app/styles/StyleVars'
import PushNotification from 'react-native-push-notification'

const styles = StyleSheet.create(reminderStyle)

const PickerItemIOS = PickerIOS.Item

const hours = [
  0, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23
]

const minutes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 42, 43, 44, 45, 46,
  47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58, 59
]

class Reminder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hours: 8,
      minutes: 10,
      setTimeButtonText: "Save",
      switchValue: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('hasReminder').then((value) => {
      const self = this

      if (value === "true") {
        self.setState({switchValue: true})
      } else {
        self.setState({switchValue: false})
      }
    })

    AsyncStorage.getItem('reminder').then((value) => {
      const self = this

      if (value != null) {
        let reminder = JSON.parse(value)

        if (reminder.hasOwnProperty('hours') && reminder.hasOwnProperty('minutes')) {
          this.setState({hours: reminder.hours})
          this.setState({minutes: reminder.minutes})
        }
      }

    })
  }

  setTime() {
    this.setState({ setTimeButtonText: 'Saving ..'})

    let hours = this.state.hours
    let minutes = this.state.minutes
    let date = new Date()

    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(0)

    PushNotification.cancelAllLocalNotifications()

    for (let i = 0; i < 365; i++) {
      let tempDate = new Date(date.getTime())

      tempDate.setDate(tempDate.getDate() + i)

      PushNotification.localNotificationSchedule({
        message: "Report time on ticktock!",
        date: tempDate.toISOString()
      })
    }

    this.setState({setTimeButtonText: 'Saved'})

    AsyncStorage.setItem("hasReminder", "true")
    AsyncStorage.setItem("reminder", JSON.stringify({
      hours: hours,
      minutes: minutes
    }))

    setTimeout(() => {
      this.props.navigator.push({
        ident: "Tasks",
        sceneConfig: {
          ...Navigator.SceneConfigs.HorizontalSwipeJumpFromRight,
          gestures: {}
        }
      })
    }, 1000)
  }

  onSwitchChange(value) {
    this.setState({switchValue: value})

    if (!value) {
      PushNotification.cancelAllLocalNotifications()
      AsyncStorage.setItem("hasReminder", "false")
      AsyncStorage.setItem("reminder", JSON.stringify({}))
    }
  }

  render() {
    if (this.state.switchValue) {
      return (
        <ViewContainer>
          <View style={ styles.titleContainer }>
            <Text style={ styles.title }>Reminder</Text>
          </View>

          <View style={ styles.switchContainer }>
            <Text style={ styles.activeText }>Active:</Text>

            <Switch
              onValueChange={(value) => this.onSwitchChange(value)}
              style={{marginBottom: 10}}
              onTintColor={StyleVars.Colors.blue}
              value={this.state.switchValue} />
          </View>

          <View style={ styles.wrapper }>
            <View style={ styles.column }>
              <Text style={ styles.pickerTitle }>Hours</Text>
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
              <Text style={ styles.pickerTitle }>Minutes</Text>
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
    } else {
      return (
        <ViewContainer>
          <View style={ styles.titleContainer }>
            <Text style={ styles.title }>Reminder</Text>
          </View>

          <View style={ styles.switchContainer }>
            <Text style={ styles.activeText }>Active:</Text>

            <Switch
              onValueChange={(value) => this.setState({switchValue: value})}
              style={{marginBottom: 10}}
              onTintColor={StyleVars.Colors.blue}
              value={this.state.switchValue} />
          </View>
        </ViewContainer>
      )
    }
  }
}

module.exports = Reminder
