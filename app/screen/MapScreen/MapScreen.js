//@dsas flow

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import Carte from '../../containers/Carte'

import Icon from "react-native-vector-icons/MaterialIcons";

//import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

//import { StatusBar } from "react-native";

//import Permissions from 'react-native-permissions';


export default class MapScreen extends Component {

//static navigationOptions = ({ navigation, screenProps }) => ({
//    drawerLabel: "Map",
//    title: "Avalanche Quebec",
//    headerLeft: (
//        <View style={{ paddingHorizontal: 10 }}>
//          <TouchableOpacity onPress={() => navigation.openDrawer()}>
//            <Icon name="menu" size={30}/>
//          </TouchableOpacity>
//        </View>
//      )
//});

  constructor(props) {
    super(props);

    //this.state = {
    //  locationPermission: 'undetermined',
    //  loading: true
    //};
  }

  componentDidMount() {
    console.log(' MapScreen componentDidMount');

    //Permissions.request('location').then(response => { // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //  this.setState({ locationPermission: response })
    //})
  }


  render() {
    return (

        <View style={styles.container}>
        <Carte />
          <View style={{ padding: 10, 
            //backgroundColor:'transparent', 
            position: 'absolute', 
            //top: 10, 
            //left: 10 
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ flexDirection: 'row' }}>
              <Icon name="menu" size={30}/><Text>Menu</Text>
            </TouchableOpacity>
          </View>
          
        </View>

    );
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },

});
