import React from 'react'
import { Screen } from 'react-native-chunky'

export default class LoadingScreen extends Screen {

    renderDataLoading() {
      return this.renderProgress()
    }

}
