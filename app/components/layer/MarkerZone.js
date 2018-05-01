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
        featuresToRender = getSourceData(source, 'element', 'markerzone');
        //console.log(zoomlevel);
    }

    
    render() {

        //const {name} = this.props;
        //console.log(name, zoomlevel[name]);
        return (
            <Mapbox.ShapeSource 
                id={'markerzone'}

                shape={featuresToRender} 
                //images={{ assets: ['marker'] }}
                >
                <Mapbox.SymbolLayer
                    id={'markerzone'}
                    style={[styles.markerzone, styles.marker]}
                    maxZoomLevel={9}
                    minZoomLevel={0}
                />
            </Mapbox.ShapeSource>
        );
    }
}


