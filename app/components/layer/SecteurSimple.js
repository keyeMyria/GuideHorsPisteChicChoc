import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'

const featuresToRender = { };

export default class SecteurSimple extends Component {
    constructor(props) {
        super(props);
        featuresToRender = getSourceData(this.props.source, 'element', 'secteur-simple');
    }

    render() {
        return (
            <Mapbox.ShapeSource id="secteursimple" shape={featuresToRender}>
                <Mapbox.FillLayer
                    id="secteursimple"
                    style={styles.secteursimple}
                />
            </Mapbox.ShapeSource>
        );
    }
}
