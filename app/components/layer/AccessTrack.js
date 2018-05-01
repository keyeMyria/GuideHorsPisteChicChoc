import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'

const featuresToRender = { };

export default class AccessTrack extends Component {

    constructor(props) {
        super(props);
        const {source} = this.props;
        featuresToRender = getSourceData(source, 'accesstrack');
    }
    
    render() {
        return (
            <Mapbox.ShapeSource id="accesstrack" shape={featuresToRender}>
                <Mapbox.LineLayer
                    id="accesstrack"
                    style={styles.accesstrack}
                />
            </Mapbox.ShapeSource>
        );
    }
}
