import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  Button,
  ActivityIndicator,
  View
} from 'react-native'

import { Styles, Screen } from 'react-native-chunky'

export default class LoginScreen extends Screen {

  constructor(props) {
    super(props)
    this.state = { email: "", password: "", error: "", progress: false}
    this._onLoginPressed = this.onLoginPressed.bind(this)
    this._onEmailChanged = this.onEmailChanged.bind(this)
    this._onPasswordChanged = this.onPasswordChanged.bind(this)
  }

  onEmailChanged(email) {
    this.setState({ email })
  }

  onPasswordChanged(password) {
    this.setState({ password })
  }

  onLoginPressed() {
    this.setState({ progress: true, error: "" })
    this.props.login({ username: this.state.email, password: this.state.password })
  }

  authHasErrorOnTrue(props) {
    // The login failed
    this.setState({ error: props.authError(), progress: false })
  }

  authHasDataOnTrue() {
    this.triggerTransition("authenticated")
  }

  renderError() {
    if (!this.state.error) {
      return (<View/>)
    }

    return (<Text style={styles.formError}>
      { this.state.error.message }
    </Text>)
  }

  renderProgress() {
    return (
      <View style={this.styles.containers.main}>
        <ActivityIndicator
          animating={true}
          style={{height: 120}}
          size="small"/>
      </View>)
  }

  renderForm() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>
          Please Login
        </Text>
        <TextInput
          style={styles.formTextField}
          placeholder={"Your Email"}
          returnKeyType="next"
          onChangeText={this._onEmailChanged}/>
        <TextInput
          style={styles.formTextField}
          secureTextEntry={true}
          placeholder={"Your Password"}
          returnKeyType="go"
          onChangeText={this._onPasswordChanged}/>
        <Button
          style={styles.formButton}
          onPress={this._onLoginPressed}
          title="Login Now"
        />
        { this.renderError() }
      </View>
    )
  }

  render() {
    return (this.state.progress ? this.renderProgress() : this.renderForm())
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  formHeader: {
    marginBottom: 20,
    marginTop: 200,
    fontSize: 20,
    alignSelf: "center",
    color: "#474747",
  },
  formError: {
    marginTop: 20,
    fontSize: 14,
    alignSelf: "center",
    color: "#ee3333",
  },
  formTextField: {
    height: 40,
    width: 200,
    alignSelf: "center",
    borderColor: '#a7a7a7',
    borderWidth: 1,
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 4
  },
  formButton: {
    margin: 20
  }
})
