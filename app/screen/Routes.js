import React from "react";

import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ToastAndroid,
    ActivityIndicator
  } from 'react-native';

import SideBar from "./SideBar/SideBar";
import MapScreen from "./MapScreen/MapScreen";

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

//const MainScreenNavigator = createStackNavigator({
//  Map: { screen: MapScreen },
//});
const Routes = createDrawerNavigator(
{
  Map: { screen: MapScreen },
}, 
{
  contentComponent: props => <SideBar {...props} />
}
);

 export default Routes;

// const MainScreenNavigator = createStackNavigator({
//  Map: { screen: MapScreen },
//});
//const Routes = createDrawerNavigator(
//{
//  Main: { screen: MainScreenNavigator },
//}, 
//{
//  contentComponent: props => <SideBar {...props} />
//}
//);

