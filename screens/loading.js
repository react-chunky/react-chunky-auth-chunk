import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Screen } from 'react-native-chunky'

export default class LoadingScreen extends Screen {

  componentDidMount() {
    this.props.retrieveData()
  }

  onDataError(error) {
    this.transitions.showLogin()
  }

  onDataChanged(data) {
    this.transitions.showDashboard()
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
