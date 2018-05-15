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
import RapportObservation from './RapportObservation'
import About from "./About";

import { createDrawerNavigator, createStackNavigator, createTabNavigator } from 'react-navigation';




const Routes = createDrawerNavigator(
    {
        Map: { screen: MapScreen },
        BulletinAvalanche: { screen: BulletinAvalanche },
        PrevisionMeteo: { screen: PrevisionMeteo },
        WebCamera: { screen: WebCamera },
        RapportObservation: { screen: RapportObservation },
        About: { screen: About },
    }, 
    {
        contentComponent: props => <SideBar {...props} />,
    }
    );
 export default Routes;



