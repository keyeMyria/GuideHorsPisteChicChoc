import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'

const featuresToRender = { };

export default class SecteurComplexe extends Component {

    constructor(props) {
        super(props);
        const {source} = this.props;
        featuresToRender = getSourceData(source, 'element', 'secteur-complexe');
    }
    
    render() {
        return (
            <Mapbox.ShapeSource id="secteurcomplexe" shape={featuresToRender}>
                <Mapbox.FillLayer
                    id="secteurcomplexe"
                    style={styles.secteurcomplexe}
                />
            </Mapbox.ShapeSource>
        );
    }
}
