import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'
import zoomlevel from './ZoomLevel.json'

import pin from '../../assets/marker.png';



const featuresToRender = { };


export default class MarkerMontagne extends Component {

    constructor(props) {
        super(props);
        const {source, name} = this.props;
        
        featuresToRender = getSourceData(source, 'element', 'markermontagne');
        //console.log(featuresToRender);
    }

    
    render() {

        //const {name} = this.props;
        //console.log(name, zoomlevel[name]);
        return (
            <Mapbox.ShapeSource 
                id={'markermontagne'}
                shape={featuresToRender} 
                //images={{item: MAP_PIN_IMAGE}}
                images={{ assets: ['marker', 'house'] }}
                >
                <Mapbox.SymbolLayer
                    id={'markermontagne'}
                    style={[styles.markermontagne, styles.marker]}
                    maxZoomLevel={11}
                    minZoomLevel={9}
                />
            </Mapbox.ShapeSource>
        );
    }
}


