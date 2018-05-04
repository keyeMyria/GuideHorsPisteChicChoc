//@dsas flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import Mapbox from '@mapbox/react-native-mapbox-gl';

import geojsonExtent from '@mapbox/geojson-extent';
import {getSourceData} from './app/lib/geojson'

import {applySplineToLineString, addArrowToLigne} from './app/lib/geojson'


import { MAPBOX_ACCESS_TOKEN, MAPBOX_MAP_STYLE } from './utils/config';

import {generateLayers} from './app/components/layer/Layer'

import geoJsonData from './app/assets/all.json';

import Permissions from 'react-native-permissions';

//import Stats from './app/components/Stats'

console.log('token',MAPBOX_ACCESS_TOKEN);
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

//const featuresCollection = [];

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      locationPermission: 'undetermined',
      loading: false,
      lastLocation: {},
      zoom: 0,
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);
    this.onPress = this.onPress.bind(this);
    
    this.onRegionIsChanging = this.onRegionIsChanging.bind(this);
    this.regionWillChange = this.regionWillChange.bind(this);
  }


  componentDidMount() {
    console.log('componentDidMount');

    Permissions.request('location').then(response => { // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response })
    })

    applySplineToLineString(geoJsonData);
    addArrowToLigne(geoJsonData);

    console.log('componentDidMount done');
  }

  componentDidCatch(errorString, errorInfo) {
    console.log(errorString, errorInfo);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  onUserLocationUpdate(location) {
    //console.log('onUserLocationUpdate', location);
    this.setState({ lastLocation: location });
  }

  async onRegionDidChange() {
    console.log('onRegionDidChange');
    const zoom = await this._map.getZoom();
    this.setState({ zoom });
    //this.setState({ loading: false })
  }

  async regionWillChange() {
    console.log('regionWillChange');
    const zoom = await this._map.getZoom();
    this.setState({ zoom });
  }

  async onRegionIsChanging() {
    console.log('onRegionIsChanging');
    const zoom = await this._map.getZoom();
    this.setState({ zoom });
  }

  async onDidFinishLoadingMap() {
    console.log('onDidFinishLoadingMap');
    const bounds = geojsonExtent(geoJsonData);
    await this._map.fitBounds([bounds[2], bounds[3]], [bounds[0], bounds[1]], [50, 100, 50, 50], 1); // [top, right, bottom, left]
    console.log('onDidFinishLoadingMap done');
    
    
    
  }

  async onPress(e) {

    console.log('onPress');
    const { screenPointX, screenPointY } = e.properties;

    const screenCoords = [];
    const offset = 50;
    screenCoords.push([screenPointX+offset, screenPointY+offset]);
    screenCoords.push([screenPointX-offset, screenPointY-offset]);

    const result = await this._map.queryRenderedFeaturesInRect(
      this.getBoundingBox(screenCoords),
      null,
      ['markerrefuge', 'markerparking', 'ligne', 'accesstrack', 'skintrack', 'markersecteur', 'markerzone', 'markermontagne']);

    //console.log(result.features);

    var groupename = '';

    for (var i = 0, len = result.features.length; i < len; i++) {
      console.log(result.features[i].properties.element, result.features[i].properties.name);

      if (result.features[i].properties.groupename)
        if (result.features[i].properties.groupename.length > 0) {
          groupename = result.features[i].properties.groupename;
        }
    }

    if (groupename.length > 0) {
      // on a matché un marker avec un groupename, on zoom sur celui-ci
      const featuresToBounds = getSourceData(geoJsonData, 'groupe', groupename);
      const bounds = geojsonExtent(featuresToBounds);
      console.log('onPress zooming to groupename ' + groupename);
      console.log(bounds, featuresToBounds);
      await this._map.fitBounds([bounds[2], bounds[3]], [bounds[0], bounds[1]], [50, 100, 50, 50], 150);
      return;

    } else if (result.features.length > 0) {
      ToastAndroid.show(result.features[0].properties.element + result.features[0].properties.name, ToastAndroid.SHORT);
      console.log('feature selected' + result.features[0]);
    }
    console.log('onPress done');
  }

  getBoundingBox(screenCoords) {
    const maxX = Math.max(screenCoords[0][0], screenCoords[1][0]);
    const minX = Math.min(screenCoords[0][0], screenCoords[1][0]);
    const maxY = Math.max(screenCoords[0][1], screenCoords[1][1]);
    const minY = Math.min(screenCoords[0][1], screenCoords[1][1]);
    return [maxY, maxX, minY, minX];
  }

  render() {
    const zoom = Number(this.state.zoom).toFixed(1);

    if (this.state.locationPermission !== 'authorized') {
      return (
        <View style={styles.container}>
            <ActivityIndicator
              animating
              color="#fff"
              size="large"
              style={styles.activityIndicator}
            />
        </View>
      );
    }

    return (
      <View style={styles.container}>

        {this.state.load === true ? (
          <View style={styles.container}>
            <ActivityIndicator
              animating
              color='black'
              size="large"
              style={styles.activityIndicator}
            />
            <Text>Loading features...</Text>
          </View>
        ) : null}

<View style={styles.container}>
 

          <Mapbox.MapView
              styleURL={MAPBOX_MAP_STYLE}
              logoEnabled={false}
              ref={(c) => (this._map = c)}
              onRegionDidChange={this.onRegionDidChange}
              onRegionIsChanging={this.onRegionIsChanging}
              onRegionWillChange={this.onRegionWillChange}
              onPress={this.onPress}
              surfaceView={true}
              //zoomLevel={15}
              //centerCoordinate={[-66.110811, 48.860292]}
              style={styles.container}
              showUserLocation={true}
              onUserLocationUpdate={this.onUserLocationUpdate}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              pitchEnabled={false}
              rotateEnabled={false}
              compassEnabled={true}
              //regionWillChangeDebounceTime={10} // default: 10
              //regionDidChangeDebounceTime={10}  // default: 500
              >

            {generateLayers(geoJsonData)}
            
          </Mapbox.MapView>

          <Text style={styles.text}>Zoom: {zoom}</Text>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute'
  },
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  text: {
    flex: 1,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
