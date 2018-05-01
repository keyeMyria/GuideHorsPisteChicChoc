import React, { Component } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import {getSourceData} from '../../lib/geojson'
import {styles} from './Style'

const featuresToRender = { };

export default class SecteurExigeant extends Component {

    constructor(props) {
        super(props);
        const {source} = this.props;
        featuresToRender = getSourceData(source, 'element', 'secteur-exigeant');
    }

    render() {
        return (
            <Mapbox.ShapeSource id="secteurexigeant" shape={featuresToRender}>
                <Mapbox.FillLayer
                    id="secteurexigeant"
                    style={styles.secteurexigeant}
                />
            </Mapbox.ShapeSource>
        );
    }
}
