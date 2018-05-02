import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'
import geoJsonLayer from './geoJsonLayer.json'

export function generateLayers(source) {

    const layers = [];

    geoJsonLayer.map(layer => {
        //console.log(layer);

        var featuresToRender = getSourceData(source, 'element', layer.name);

        if (layer.type == 'marker') {
            layers.push (
                <Mapbox.ShapeSource 
                    key={layer.name} 
                    id={layer.name} 
                    shape={featuresToRender} 
                    images={{ assets: ['marker'] }}
                >
                    <Mapbox.SymbolLayer
                        id={layer.name}
                        style={[styles[layer.name]]}
                        maxZoomLevel={layer.maxZoom}
                        minZoomLevel={layer.minZoom}
                    />
                </Mapbox.ShapeSource>
            );
        }
    });

    return layers;
}


