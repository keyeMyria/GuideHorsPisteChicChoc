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
import BulletinAvalanche from "./BulletinAvalanche";
import PrevisionMeteo from "./PrevisionMeteo";
import WebCamera from "./WebCamera";

import { createDrawerNavigator, createStackNavigator, createTabNavigator } from 'react-navigation';




const Routes = createDrawerNavigator(
    {
        Map: { screen: MapScreen },
        BulletinAvalanche: { screen: BulletinAvalanche },
        PrevisionMeteo: { screen: PrevisionMeteo },
        WebCamera: { screen: WebCamera },
    }, 
    {
        contentComponent: props => <SideBar {...props} />
    }
    );
 export default Routes;



