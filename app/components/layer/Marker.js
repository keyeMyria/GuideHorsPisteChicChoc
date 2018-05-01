import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'
import zoomlevel from './ZoomLevel.json'



const featuresToRender = { };


export default class Marker extends Component {

    constructor(props) {
        super(props);
        const {source, name} = this.props;
        featuresToRender = getSourceData(source, name);
        //console.log(zoomlevel);
    }

    
    render() {

        const {name} = this.props;
        //console.log(name, zoomlevel[name]);
        return (
            <Mapbox.ShapeSource 
                id={name} 
                onPress={(e) => {
                    console.log('onPress',e);
                  }}
                shape={featuresToRender} 
                //images={{ assets: ['marker'] }}
                >
                <Mapbox.SymbolLayer
                    id={name}
                    style={[styles[name], styles.marker]}
                    maxZoomLevel={zoomlevel[name].maxZoom}
                    minZoomLevel={zoomlevel[name].minZoom}
                />
{/*}
            <MapboxGL.SymbolLayer
            id="singlePoint"
            filter={['all', ['!has', 'point_count'], ['==', 'isSelected', false]]}
            style={[layerStyles.icon, layerStyles.iconPremium]}
          />
*/}
            </Mapbox.ShapeSource>
        );
    }
}


