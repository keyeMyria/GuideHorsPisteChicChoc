import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'

const featuresToRender = { };

export default class Descente extends Component {

    constructor(props) {
        super(props);
        const {source} = this.props;
        featuresToRender = getSourceData(source, 'ligne');
    }
    
    render() {
        return (
            <Mapbox.ShapeSource id="ligne" shape={featuresToRender}
            //onPress={(e) => {
            //    console.log('Descente onPress',e);
            //  }}
            >
                <Mapbox.LineLayer
                    id="ligne"
                    style={styles.descente}
                />
            </Mapbox.ShapeSource>
        );
    }
}

