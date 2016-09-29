'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  NativeModules,
  TouchableOpacity
} from 'react-native'

import StyleVars from 'mrticktock/app/styles/StyleVars'
import taskListItemStyle from 'mrticktock/app/styles/TaskListItem'
import Icon from 'react-native-vector-icons/FontAwesome'

import ApiManager from 'mrticktock/app/api/ApiManager'

import { storeActiveTask } from 'mrticktock/app/actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create(taskListItemStyle)

class TaskListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      task: this.props.task,
      isActiveTask: this.props.activeTask ? this.props.task.id === this.props.activeTask.task_id : false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTask) {
      nextProps.activeTask.id === this.state.task.id ? this.setState({ isActiveTask: true}) : this.setState({ isActiveTask: false})
    }
  }

  render() {
    return (
      <View style={ styles.taskRow }>
        {
          this.state.isActiveTask
          ? <Icon name="pause" style={ styles.toggleButton } onPress={() => this.toggleTask()} />
          : <Icon name="play" style={ styles.toggleButton } onPress={() => this.toggleTask()} />
        }
        <View style={ styles.taskInfo }>
          <Text numberOfLines={1} style={ styles.taskInfoText }>{ this.state.task.task_name }</Text>
          <Text style={[styles.taskInfoText], styles.taskInfoProject }>
            { this.state.task.customer_name } / { this.state.task.project_name }
          </Text>
        </View>
      </View>
    )
  }

  toggleTask() {
    this.props.storeActiveTask({})

    if (this.state.isActiveTask != true) {
      this.props.storeActiveTask(this.state.task)
      ApiManager.startTimer(this.props.login[0], this.props.task.id)
    } else {
      ApiManager.stopTimer(this.props.login[0], this.props.task.id)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeActiveTask }, dispatch)
}

function mapStateToProps(state) {
  return {
    activeTask: state.activeTask[0],
    login: state.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem)
