import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'

const featuresToRender = { };

export default class SkinTrack extends Component {

    constructor(props) {
        super(props);
        const {source} = this.props;
        featuresToRender = getSourceData(source, 'element', 'skintrack');
    }
    
    render() {
        return (
            <Mapbox.ShapeSource id="skintrack" shape={featuresToRender}>
                <Mapbox.LineLayer
                    id="skintrack"
                    style={styles.skintrack}
                />
            </Mapbox.ShapeSource>
        );
    }
}