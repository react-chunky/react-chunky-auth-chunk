import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  ActivityIndicator,
  View
} from 'react-native'
import { FormLabel, FormInput, Button, FormValidationMessage, Card } from 'react-native-elements'

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
    return (<View style={styles.container}>
          <Card
            title='Please Sign In'
            titleStyle={styles.formHeader}
            style={styles.formContainer}>
            <FormInput
             placeholder={'Enter Your Email'}  
             onChangeText={this._onEmailChanged} 
             style={styles.formTextField}/>
           <FormInput 
             placeholder={'Enter Your Password'}  
             onChangeText={this._onPasswordChanged} 
             secureTextEntry={true}
             style={styles.formTextField}/>        
           <Button
             style={styles.formButton}
             backgroundColor='#039BE5'
             onPress={this._onLoginPressed}
             icon={{name: 'user-circle-o', type: 'font-awesome'}}
             title='SIGN IN NOW' />
          </Card>
         
        </View>)
  }

  render() {
    return (this.state.progress ? this.renderProgress() : this.renderForm())
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  formHeader: {
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 20,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  formError: {
    marginTop: 20,
    fontSize: 14,
    alignSelf: "center",
    color: "#ee3333"
  },
  formTextField: {
    height: 60,
    width: 200,
    alignSelf: "center",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  formButton: {
    margin: 50
  }
})
