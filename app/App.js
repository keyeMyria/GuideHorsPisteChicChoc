//@dsas flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  YellowBox
} from 'react-native';

import Permissions from 'react-native-permissions';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import { Provider } from 'react-redux';

import rootReducer from './reducers'
import { addRapport } from './actions'

import LoadingScreen from './screen/LoadingScreen'
import Routes from './screen/Routes'



const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      locationPermission: 'undetermined',
    };


    console.log(store.getState());

    const unsubscribe = store.subscribe( () => console.log(store.getState()) )

    store.dispatch(addRapport({
      id: 4543,
      timestamp: '12/12/2018',
      lieu: 'valliere',
      description: 'grosse avalanche taille 3'
     }));

     unsubscribe();

  }

  componentDidMount() {
    console.log('componentDidMount');
    
    Permissions.request('location').then(response => { // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response })
    })
  }


  render() {

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
    //if (this.state.locationPermission != 'authorized') {
    //  return <LoadingScreen />;
    //}
    //return <Routes />;
  }

}
