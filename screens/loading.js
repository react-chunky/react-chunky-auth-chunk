import React from 'react'
import { Screen } from 'react-native-chunky'

export default class LoadingScreen extends Screen {

  renderDataDefaults() {
    return this.renderDataLoading()
  }

  operationDidFinish(action, data, error) {
    switch(action) {
      case "checkUser": 
        // We've got a user, let's get its account
        data && data.main && !error && this.props.getAccount({ email: data.main.user.email })

        // We could not find the cached account so let's clean up first
        error && error.main && !data && this.props.cleanUp()
      break
      case "getAccount":
        // We're ready to show the user's dashboard
        data && data.account && !error && this.transitions.showDashboard({ account: data.account })
      break
      case "cleanUp":
        // We've got no account data, so let's go to the login
        !data && !error && this.transitions.showLogin()
      break
    }
  }

}
