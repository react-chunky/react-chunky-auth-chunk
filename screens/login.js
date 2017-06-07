import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  ActivityIndicator,
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'

import { Styles, Screen } from 'react-native-chunky'

let window = Dimensions.get('window'),
  screen = Dimensions.get('window'),
  smallScreen  = screen.height < 500;

export default class LoginScreen extends Screen {

  constructor(props) {
    super(props)
    this.state = { email: "", password: "", password2: "", error: "", progress: false, loginOffset: new Animated.Value(0), register: false}
    this._onLoginPressed = this.onLoginPressed.bind(this)
    this._onRegisterPressed = this.onRegisterPressed.bind(this)
    this._onEmailChanged = this.onEmailChanged.bind(this)
    this._onPasswordChanged = this.onPasswordChanged.bind(this)
    this._onPasswordConfirmedChanged = this.onPasswordConfirmedChanged.bind(this)
  }

  componentWillMount() {
    super.componentWillMount()
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }

  onEmailChanged(email) {
    this.setState({ email,  error: ''})
  }

  onPasswordChanged(password) {
    this.setState({ password,  error: '' })
  }

  onPasswordConfirmedChanged (password2) {
    this.setState({ password2,  error: '' })
  }

  onLoginPressed() {
    Keyboard.dismiss()

    if (this.state.email.trim().length === 0) {
      this.setState({ progress: false, error: "Please enter an email address" })
      return        
    }      

    if (this.state.password.trim().length === 0) {
      this.setState({ progress: false, error: "Please enter a password" })
      return        
    }      

    if (!this.state.register) {
      this.setState({ progress: true, error: "" })
      this.props.loginEmail({ username: this.state.email, password: this.state.password })
      return
    }

    if (this.state.password !== this.state.password2) {
      this.setState({ progress: false, error: "The passwords do not match" })
      return        
    }

    this.setState({ progress: true, error: "" })
    this.props.registerEmail({ username: this.state.email, password: this.state.password })
  }

  onRegisterPressed() {
    this.setState({ register: !this.state.register, error: '' })
  }

  keyboardWillShow(e) {
    Animated.timing(this.state.loginOffset, {
      duration: 220,
      toValue: Platform.OS === 'ios' ? (smallScreen ? -90 : -70) : (smallScreen ? -60 : -40),
    }).start();

  }

  keyboardWillHide() {
    Animated.timing(this.state.loginOffset, {
      duration: 220,
      toValue: 0
    }).start()
  }

  onDataError(error) {
    this.setState({ error: error.message || 'Oops, this should not happen', progress: false })
  }

  onDataChanged(data) {
    this.transitions.showDashboard()
  }

  renderError() {
    if (!this.state.error) {
      return (<View/>)
    }

    return (<Text style={this.styles.formError}>
          { this.state.error }
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

  get styles () {
    return Object.assign(super.styles, styles(this.props))
  }

  renderExtraField() {
    if (this.state.register) {
      return (<FormInput
            placeholder={'Confirm your password'}
            onChangeText={this._onPasswordConfirmedChanged}
            secureTextEntry={true}
            autoCorrect={false}
            blurOnSubmit={false}
            style={this.styles.formTextField}/>)
    }

    return (<View/>)
  }

  renderContent() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={this.styles.container}>
        <Animated.View style={[{ transform: [{translateY: this.state.loginOffset}]}]}>
          <Icon
            reverse={this.props.dark}
            size={80}
            style={this.styles.logo}
            name={ this.state.register ? 'account-circle' : 'lock' }
            color='#37474F'
          />
          <Card
            title={ this.state.register ? 'Create A New Account' : 'Please Sign In' }
            titleStyle={this.styles.formHeader}
            style={this.styles.formContainer}>
            { this.renderError() }
            <FormInput
              placeholder={'Enter Your Email'}
              value={this.state.email}
              onChangeText={this._onEmailChanged}
              autoCorrect={false}
              blurOnSubmit={false}
              autoCapitalize='none'
              style={this.styles.formTextField}/>
            <FormInput
              placeholder={this.state.register ? 'Choose a password' : 'Enter Your Password' }
              onChangeText={this._onPasswordChanged}
              secureTextEntry={true}
              autoCorrect={false}
              blurOnSubmit={false}
              style={this.styles.formTextField}/>
            { this.renderExtraField() }
            <Button
              style={this.styles.formButton}
              backgroundColor='#039BE5'
              onPress={this._onLoginPressed}
              icon={{name: 'user-circle-o', type: 'font-awesome'}}
              title={ this.state.register ? 'Sign Up' : 'Sign In'} />
            <Button
              style={this.styles.formSecondaryButton}
              backgroundColor='#ffffff'
              color="#039BE5"
              onPress={this._onRegisterPressed}
              title={ this.state.register ? 'Already have an account?' : 'Create an account' }/>
              </Card>
          </Animated.View></View></TouchableWithoutFeedback>)
  }

  renderForm() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={this.styles.container}>
        { this.renderContent() }
      </ScrollView>)
  }

  render() {
    return (this.state.progress ? this.renderProgress() : this.renderForm())
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.dark ? '#37474F' : '#FAFAFA'
  },
  logo: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  formHeader: {
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 20,
    borderRadius: 4,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  formError: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    color: '#f44336'
  },
  formTextField: {
    height: 60,
    width: 250,
    alignSelf: "center",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  formButton: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 40,
    marginBottom: 20
  },
  formSecondaryButton: {
    margin: 10
  }
})
