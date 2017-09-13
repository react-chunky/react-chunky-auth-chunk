import React from 'react'
import { Components, Utils } from 'react-native-chunky'
import { default as ImagePicker } from 'react-native-image-picker'

export default class SetupScreen extends Components.Form {

  constructor(props) {
    super(props)
    this.state = { ...this.state, progress: true }
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
    this.props.updateAccount(Object.assign({ name, phone }, this.state.location, { photoData: this.state.photoData }))
  }

  selectedImageField(name, options) {
    this.setState({ progress: true })

    this.choosePhoto()
  }

  onImageFieldPressed(name) {
    this.setState({ progress: true })

    this.choosePhoto()
  }

  imageFieldData(name) {
    if (this.state.photoData) {
      return {
        source: { uri: `data:image/jpeg;base64,${this.state.photoData}` }
      }
    }

    return {
      icon: {name: 'account-circle'}
    }
  }

  choosePhoto() {
    ImagePicker.showImagePicker({ title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
    }, (response) => {
      if (response.didCancel) {
        this.setState({ progress: false })
      }

      else if (response.error) {
        this.setState({ progress: false })
      }

      else {
        this.setState({ progress: false, photoData: response.data })
      }
    })
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
