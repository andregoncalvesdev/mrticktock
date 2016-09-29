'use strict'

import React, { Component } from 'react'
import {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  NativeModules,
  RefreshControl,
  NativeAppEventEmitter,
  AlertIOS
} from 'react-native'
import ViewContainer from 'mrticktock/app/components/ViewContainer'
import TaskListItem from 'mrticktock/app/components/TaskListItem'
import StyleVars from 'mrticktock/app/styles/StyleVars'
import tasksStyle from 'mrticktock/app/styles/Tasks'
import Icon from 'react-native-vector-icons/FontAwesome'

import ApiManager from 'mrticktock/app/api/ApiManager'
import PushController from 'mrticktock/app/controllers/PushController'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { storeTaskShow, assignTasks } from 'mrticktock/app/actions/index'
import { SwipeListView } from 'react-native-swipe-list-view';

const styles = StyleSheet.create(tasksStyle)
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Tasks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksDataSource: ds.cloneWithRows(this.props.tasks),
      activeTask: this.props.activeTask,
      refreshing: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ activeTask: nextProps.activeTask })
  }

  render() {
    return (
      <ViewContainer>
        <View style={ styles.titleContainer }>
          <Text style={ styles.title }>Tasks</Text>
        </View>

        <SwipeListView
          dataSource={ this.state.tasksDataSource }
          renderRow={(task) => {
            return this._renderTaskRow(task)
          }}
          renderHiddenRow={ (data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={ _ => this.hideRow(secId, rowId, rowMap) }>
								<Text style={styles.backTextWhite}>Hide</Text>
							</TouchableOpacity>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={ _ => this.navigateToTaskShow(secId, rowId, rowMap) }>
								<Text style={styles.backTextWhite}>Set Time</Text>
							</TouchableOpacity>
            </View>
          )}
          rightOpenValue={ -150 }
          disableRightSwipe={ true }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />

        <PushController />
      </ViewContainer>
    )
  }

  _renderTaskRow(task) {
    return (
      <TaskListItem task={ task } key={ task.id } />
    )
  }

  _onRefresh() {
    this.setState({refreshing: true})

    let tasksPromise = ApiManager.getTasks(this.props.login[0])
    let self = this

    tasksPromise.then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          if (!data.errors.length) {
            self.props.assignTasks(data.content)

            self.setState({
              tasksDataSource: ds.cloneWithRows(data.content)
            })

            self.setState({refreshing: false})
          }
        })
      }
    })
  }

  hideRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow()
    let newTasks = this.props.tasks
		let deletedTask = newTasks.splice(rowId, 1)

    this.props.assignTasks(newTasks)

    ApiManager.hideTask(this.props.login[0], deletedTask[0].id)

		this.setState({
      tasksDataSource: ds.cloneWithRows(newTasks)
    })
  }

  navigateToTaskShow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow()
    this.props.storeTaskShow(this.props.tasks[rowId])
    this.props.navigator.push({ident: "TaskShow"})
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks[0],
    activeTask: state.activeTask[0],
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeTaskShow, assignTasks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
