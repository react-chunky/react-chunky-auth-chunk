import React from 'react'
import FormScreen from './form'

export default class LoginScreen extends FormScreen {

  onQuestionPressed() {
    this.transitions.showRegister()
  }

  validate() {
    if (!this.state.fields.email || this.state.fields.email.trim().length === 0) {
      return this.props.strings.emailEmpty
    }

    if (!this.state.fields.password || this.state.fields.password.trim().length === 0) {
      return this.props.strings.passwordEmpty
    }
  }

  submit({ email, password }) {
    this.props.signIn({ email, password })
  }

}
