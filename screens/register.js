import React from 'react'
import FormScreen from './form'

export default class RegisterScreen extends FormScreen {


  validate() {
    if (!this.state.fields.email || this.state.fields.email.trim().length === 0) {
      return this.props.strings.emailEmpty
    }

    if (!this.state.fields.password || this.state.fields.password.trim().length === 0) {
      return this.props.strings.passwordEmpty
    }

    if (!this.state.fields.password2 || this.state.fields.password2.trim().length === 0) {
      return this.props.strings.password2Empty
    }
  }

  submit({ email, password }) {
    this.props.signUp({ email, password })
  }

  onQuestionPressed() {
    this.transitions.showLogin()
  }

}
