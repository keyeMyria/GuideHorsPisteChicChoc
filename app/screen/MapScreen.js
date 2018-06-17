//@dsas flow

import React, { Component } from "react";
import { TouchableOpacity, View, StatusBar } from "react-native";
import {SafeAreaView} from "react-navigation"
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
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
        
          <Carte />
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 10,
              position: "absolute"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Icon name="menu" size={36} />
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}
