'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StyleVars from 'mrticktock/app/styles/StyleVars'

class ViewContainer extends Component {
  render() {
    return (
      <View style={ styles.viewContainer }>
        { this.props.children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: StyleVars.Colors.darkerBlue,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
})

module.exports = ViewContainer
