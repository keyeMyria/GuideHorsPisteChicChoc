import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'
import zoomlevel from './ZoomLevel.json'



const featuresToRender = { };


export default class MarkerZone extends Component {

    constructor(props) {
        super(props);
        const {source, name} = this.props;
        featuresToRender = getSourceData(source, 'markerparking');
        //console.log(zoomlevel);
    }

    
    render() {

        //const {name} = this.props;
        //console.log(name, zoomlevel[name]);
        return (
            <Mapbox.ShapeSource 
                id={'markerparking'}
                //onPress={(e) => {
                //    console.log('onPress',e);
                //  }}
                shape={featuresToRender} 
                //images={{ assets: ['marker'] }}
                >
                <Mapbox.SymbolLayer
                    id={'markerparking'}
                    style={[styles.markerparking]}
                    //maxZoomLevel={18}
                    //minZoomLevel={11.5}
                />
            </Mapbox.ShapeSource>
        );
    }
}


