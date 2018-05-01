
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Bubble from './Bubble';

export default class Stats extends Component {

    render() {
        //const {lastLocation} = this.props
        
        if (this.props.lastLocation.coords == undefined)
        return ( 
            null
        );     
        
        const altitude = Number(this.props.lastLocation.coords.altitude).toFixed(2);
        const latitude = Number(this.props.lastLocation.coords.latitude).toFixed(2);
        const longitude = Number(this.props.lastLocation.coords.longitude).toFixed(2);
        const accuracy = Number(this.props.lastLocation.coords.accuracy).toFixed(2);
        const zoom = Number(this.props.zoom).toFixed(1);

        return (
            <Bubble>
                <Text>Latlon: {latitude}, {longitude} @{altitude}m </Text>
                <Text>Accuracy: {accuracy}m</Text>
                <Text>Zoom: {zoom}</Text>
            </Bubble>
        );
    }
}