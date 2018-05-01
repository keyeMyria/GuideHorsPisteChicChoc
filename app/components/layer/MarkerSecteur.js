import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'
import zoomlevel from './ZoomLevel.json'



const featuresToRender = { };


export default class MarkerSecteur extends Component {

    constructor(props) {
        super(props);
        const {source, name} = this.props;
        featuresToRender = getSourceData(source, 'markersecteur');
        //console.log(zoomlevel);
    }

    
    render() {

        //const {name} = this.props;
        //console.log(name, zoomlevel[name]);
        return (
            <Mapbox.ShapeSource 
                id={'markersecteur'}
                shape={featuresToRender} 
                //images={{ assets: ['marker'] }}
                >
                <Mapbox.SymbolLayer
                    id={'markersecteur'}
                    style={[styles.markersecteur, styles.marker]}
                    maxZoomLevel={14}
                    minZoomLevel={11}
                />
            </Mapbox.ShapeSource>
        );
    }
}


