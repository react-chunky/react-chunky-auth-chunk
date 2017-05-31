import React, { Component } from 'react'
import {
  Image,
  View,
  ActivityIndicator
} from 'react-native'

import { Styles, Screen } from 'react-native-chunky'

export default class LoadingScreen extends Screen {

  componentDidMount() {
    this.props.findToken()
  }

  authHasErrorOnTrue() {
    this.triggerTransition("not_authenticated")
  }

  authHasDataOnTrue(newProps) {
    const user = Object.assign({}, newProps.authData())
    this.triggerTransition("authenticated", { user })
  }

  render() {
    return (
      <View style={this.styles.containers.main}>
        <ActivityIndicator
          animating={true}
          style={{height: 120}}
          size="small"/>
      </View>)
  }
}
