import React from 'react'
import {
  StyleSheet,
  Text,
  Platform,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'
import { Styles } from 'react-native-chunky'

import FormScreen from './form'

export default class LoginScreen extends FormScreen {

  constructor(props) {
    super(props)
    this.state = { ...this.state, register: true }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  validate() {
    if (!this.state.fields.email || this.state.fields.email.trim().length === 0) {
      return this.props.strings.emailEmpty
    }

    if (!this.state.fields.password || this.state.fields.password.trim().length === 0) {
      return this.props.strings.passwordEmpty
    }

    if (this.state.register && (!this.state.fields.password2 || this.state.fields.password2.trim().length === 0)) {
      return this.props.strings.password2Empty
    }
  }

  verify({ email, password }) {
    if (this.state.register) {
      this.props.signUp({ email, password })
      return
    }

    this.props.signIn({ email, password })
  }

  operationDidFinish(action, data, error) {
     switch(action) {
      case "signIn":
        // We've got a user, let's get its account
        data && data.main && !error && this.props.getAccount()

        // We could not find the cached account so let's clean up first
        error && error.main && !data && this.setState({ error: error.main.message })
        break
      case "getAccount":
        // We're ready to show the user's dashboard
        data && data.account && !error && this.transitions.showDashboard({ account: data.account })
      break
    }
  }

}
