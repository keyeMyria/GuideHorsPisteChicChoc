import React from "react";

import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ToastAndroid,
    ActivityIndicator
  } from 'react-native';

import SideBar from "./SideBar";
import MapScreen from "./MapScreen";
import BulletinMeteoScreen from "./BulletinMeteoScreen";

import { createDrawerNavigator, createStackNavigator, createTabNavigator } from 'react-navigation';

//const MainScreenNavigator = createTabNavigator({
//  Map: { 
//    screen: MapScreen,
//    navigationOptions: {
//      drawerLabel: 'Carte'
//      }    
//  },
//  Meteo: { 
//    screen: BulletinMeteoScreen,
//    navigationOptions: {
//      drawerLabel: 'Bulletin Météo'
//    }    
//  },
//},
//  {
//    navigationOptions: ({ navigation }) => ({
//        tabBarVisible: false,
//        swipeEnabled: false
//      }),
//  });
//const Routes = createDrawerNavigator(
//{
//  Main: { screen: MainScreenNavigator },
//}, 
//{
//  contentComponent: props => <SideBar {...props} />
//}
//);


const Routes = createDrawerNavigator(
  {
    Map: { screen: MapScreen },
    Meteo: { screen: BulletinMeteoScreen },
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

