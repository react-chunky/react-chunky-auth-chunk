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
import Spinner from 'react-native-loading-spinner-overlay'

let window = Dimensions.get('window'),
  screen = Dimensions.get('window'),
  smallScreen  = screen.height < 500

export default class FormScreen extends Screen {

  constructor(props) {
    super(props)

    this._onContinuePressed = this.onContinuePressed.bind(this)
    this._onQuestionPressed = this.onQuestionPressed.bind(this)
    this._onFieldChanged = (name, options) => this.onFieldChanged.bind(this, name, options)

    this.state = { ...this.state, fields: {}, error: "", progress: false, extended: true, loginOffset: new Animated.Value(0) }
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

  onFieldChanged(name, options, value) {
    var fields = Object.assign({}, this.state.fields)
    fields[name] = value
    this.setState({ fields,  error: '' })
  }

  validate() {}
  submit(data) {}

  onQuestionPressed() {}

  onContinuePressed() {
    // Start by dismissing the keyboard
    Keyboard.dismiss()

    // Check for validation errors
    const error = this.validate()

    if (error) {
        // The form is invalid
        this.setState({ progress: false, error })
        return
    }

    // Looks like the form is valid
    this.setState({ progress: true, error: "" })

    // Perform the success action
    this.submit(this.state.fields)
  }

  keyboardWillShow(e) {
    Animated.timing(this.state.loginOffset, {
      duration: 220,
      toValue: Platform.OS === 'ios' ? (smallScreen ? -90 : -60) : (smallScreen ? -60 : -40),
    }).start()
  }

  keyboardWillHide() {
    Animated.timing(this.state.loginOffset, {
      duration: 220,
      toValue: 0
    }).start()
  }

  renderError() {
    if (!this.state.error) {
      return (<View/>)
    }

    return (<Text style={this.styles.formError}>
          { this.state.error }
      </Text>)
  }

  get styles () {
    return Object.assign(super.styles, styles(this.props))
  }

  renderDataError() {
    return this.renderData()
  }

  renderDataDefaults() {
    return this.renderData()
  }

  renderDataLoading() {
    return this.renderProgress()
  }

  renderData() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={this.styles.container}>
        { this.renderContent() }
      </ScrollView>)
  }

  renderField(name, options) {
      return (<FormInput
            key={`${name}Field`}
            placeholder={ this.props.strings[`${name}Placeholder`] }
            onChangeText={this._onFieldChanged(name, options)}
            secureTextEntry={ options.secure }
            autoCorrect={ false }
            placeholderTextColor= { "#BDBDBD" }
            autoCapitalize={ "none" }
            blurOnSubmit={ true }
            keyboardType={ options.type === 'email' ? 'email-address' : 'default' }
            style={this.styles.formTextField}/>)
  }

  renderFields() {
    if (!this.props.fields || Object.keys(this.props.fields).length === 0) {
      return <View/>
    }
    var fields = []
    for (const field in this.props.fields) {
      if (this.state.extended || !this.props.fields[field].extended) {
        fields.push(this.renderField(field, this.props.fields[field]))
      }
    }
    return fields
  }


renderLogo() {
  return  (<Image source={require('../../../assets/logo.png')}
                 style={this.styles.logo}/>)
}

renderSubmitButton() {
  return (<Button
      buttonStyle={this.styles.formButton}
      backgroundColor={this.props.theme.primaryColor}
      color='#ffffff'
      onPress={this._onContinuePressed}
      icon={{name: 'user-circle-o', type: 'font-awesome'}}
      title={ this.props.strings.action }/>)
}

showError(error) {
  this.setState({ error: error.message })
}

renderProgress() {
  return (<Spinner visible={ this.state.progress } overlayColor={this.props.theme.progressColor} textContent={"Please wait a moment"} textStyle={{color: '#FFFFFF'}} />)
}

renderQuestionButton() {
  return (<Button
      buttonStyle={this.styles.formSecondaryButton}
      backgroundColor='#ffffff'
      color={this.props.theme.primaryColor}
      onPress={this._onQuestionPressed}
      title={ this.props.strings.question }/>)
}

renderContent() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={this.styles.container}>
        <Animated.View style={[{ transform: [{translateY: this.state.loginOffset}]}]}>
          { this.renderLogo() }
          <Card
            title={ this.props.strings.header }
            titleStyle={this.styles.formHeader}
            style={this.styles.formContainer}>
            { this.renderError() }
            { this.renderFields() }
            { this.renderSubmitButton() }
            { this.renderQuestionButton() }
          </Card>
          </Animated.View></View></TouchableWithoutFeedback>)
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
    width: 80,
    height: 80
  },
  formHeader: {
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 20,
    elevation: 3,
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
