import React from 'react'
import { Screen } from 'react-native-chunky'

export default class LoadingScreen extends Screen {

  renderDataDefaults() {
    return this.renderDataLoading()
  }

  operationDidFinish(action, data, error) {   
    if (error && error.main && !data) {
      // We could not find the cached account so let's clean up first
      this.props.cleanUp()
      return
    }

    if (!error && !data) {
      // We've got no account data, so let's go to the login
      this.transitions.showLogin()
      return
    }

    if (!error && data) {
      // We've got the account data, so let's go to the dashboard
      this.transitions.showDashboard()
      return
    }
  }

}
