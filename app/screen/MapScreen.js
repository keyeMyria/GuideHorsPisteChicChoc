//@dsas flow

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import Carte from "../components/Carte";

import Icon from "react-native-vector-icons/Entypo";
export default class MapScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    console.log("MapScreen componentWillUnmount");
  }

  componentDidMount() {
    console.log(" MapScreen componentDidMount");

    //Permissions.request('location').then(response => { // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //  this.setState({ locationPermission: response })
    //})
  }

  render() {
    return (
      <View style={styles.container}>
        <Carte />
        <View
          style={{
            padding: 10,
            //backgroundColor:'transparent',
            position: "absolute"
            //top: 10,
            //left: 10
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Icon name="menu" size={36} />
            {/*<Text style={{ fontSize:24}}> Menu</Text>*/}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  }
});
