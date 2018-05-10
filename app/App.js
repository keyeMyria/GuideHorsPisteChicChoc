//@dsas flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  ActivityIndicator,
  YellowBox
} from 'react-native';

import LoadingScreen from './screen/LoadingScreen'
import MapScreen from './screen/MapScreen'
import Routes from './screen/Routes'

import Permissions from 'react-native-permissions';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      locationPermission: 'undetermined',
      loading: false
    };
  }

  componentDidMount() {
    console.log('componentDidMount');

    Permissions.request('location').then(response => { // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response })
    })
  }


  render() {

    if (this.state.locationPermission != 'authorized') {
      return <LoadingScreen />;
    }
    return <Routes />;
  }

}
