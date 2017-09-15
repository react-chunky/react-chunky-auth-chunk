import React from 'react'
import { Components, Utils } from 'react-native-chunky'
import { default as ImagePicker } from 'react-native-image-picker'

export default class SetupScreen extends Components.Form {

  constructor(props) {
    super(props)
    this.state = { ...this.state, progress: false }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  ready(data) {
    if (this.props.detectLocation) {
      this.detectLocation(data)
      return
    }

    this.showForm(data)
  }

  detectLocation(data) {
    Utils.Geocoder.detectCoordinates().
                  then((location) => this.showForm(data, location)).
                  catch((error) => this.detectLocation())
  }

  showForm(data, location) {
    this.setState({ data, location, progress: false})
  }

  validate() {
    if (!this.state.fields.phone || this.state.fields.phone.trim().length === 0) {
      return this.props.strings.phoneEmpty
    }
  }

  submit({ name, phone }) {
    this.props.updateAccount(Object.assign({ name, phone }, this.state.location, { photoData: this.state.photoData}))
  }

  selectedImageField(name, options) {
    this.choosePhoto()
  }

  onImageFieldPressed(name) {
    this.choosePhoto()
  }

  imageFieldData(name) {
    if (this.state.photoData) {
      return {
        source: { uri: this.state.photoData }
      }
    }

    return {
      icon: {name: 'account-circle'}
    }
  }

  choosePhoto() {
    this.setState({ progress: true })
    setTimeout(() =>
              Utils.Photo.choosePhoto("Choose Your Photo", 120, 120).
                then((data) => {
                  this.setState({ photoData: data, progress: false })
                }).
                catch((error) => {
                  this.setState({ progress: false })
                }), 300)
  }


  onQuestionPressed() {
    // Check if the form is valid
    if (!this.isFormValid()) {
      return
    }

    // It's ok to skip
    this.transitions.showDashboard()
  }

}
