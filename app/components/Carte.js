//@dsas flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import { MAPBOX_ACCESS_TOKEN, MAPBOX_MAP_STYLE } from '../utils/conf';
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

import geojsonExtent from '@mapbox/geojson-extent';

import {getSourceData, applySplineToLineString, addArrowToLigne, getGroupeNameFromFeatures} from '../lib/geojson'
import {getScreenBoundingBox} from '../lib/screen'

import {generateLayers} from './layer/Layer'

import geoJsonData from '../assets/all.json';
import geoJsonLayer from '../assets/geoJsonLayer.json'


import SplashScreen from 'react-native-splash-screen';


export default class Carte extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lastLocation: {},
      zoom: 0,
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);
    this.onPress = this.onPress.bind(this);
    
    //this.onRegionIsChanging = this.onRegionIsChanging.bind(this);
    this.regionWillChange = this.regionWillChange.bind(this);
  }


  componentDidMount() {
    console.log('Carte componentDidMount');

    applySplineToLineString(geoJsonData);
    addArrowToLigne(geoJsonData);

    console.log('Carte componentDidMount done', );
  }

  componentDidCatch(errorString, errorInfo) {
    console.log(errorString, errorInfo);
  }

  componentWillUnmount() {
    console.log('Carte componentWillUnmount');
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

  //async onRegionIsChanging() {
  //  console.log('onRegionIsChanging');
  //  const zoom = await this._map.getZoom();
  //  this.setState({ zoom });
  //}

  async onDidFinishLoadingMap() {
    console.log('onDidFinishLoadingMap');
    await this.zoomToFeatures(geoJsonData);
    SplashScreen.hide();
    console.log('onDidFinishLoadingMap done');
    
  }

  async zoomToFeatures(featuresToBounds, animation_time = 1) {
    const bounds = geojsonExtent(featuresToBounds);
    await this._map.fitBounds([bounds[2], bounds[3]], [bounds[0], bounds[1]], [50, 100, 50, 50], animation_time);
  }



  async onPress(e) {
    console.log('onPress');

    const selectedFeatures = await this._map.queryRenderedFeaturesInRect(
      getScreenBoundingBox(e.properties.screenPointX, e.properties.screenPointY),
      null,
      geoJsonLayer.map(item => item.name)
    );

    const groupename = getGroupeNameFromFeatures(selectedFeatures);

    if (groupename.length > 0) {
      console.log('zooming to groupename ' + groupename[0]);
      const featuresToBounds = getSourceData(geoJsonData, 'groupe', groupename[0]);
      await this.zoomToFeatures(featuresToBounds, 150);

    } else { 
      if (selectedFeatures.features.length > 0) {
        ToastAndroid.show(selectedFeatures.features[0].properties.element + ': ' + selectedFeatures.features[0].properties.name, ToastAndroid.SHORT);
        console.log('feature selected' + selectedFeatures.features[0]);
      }
    }
  }

  render() {
    const zoom = Number(this.state.zoom).toFixed(1);

    return (
      <View style={styles.container}>

        <Mapbox.MapView
            styleURL={MAPBOX_MAP_STYLE}
            logoEnabled={false}
            ref={(c) => (this._map = c)}
            onRegionDidChange={this.onRegionDidChange}
            //onRegionIsChanging={this.onRegionIsChanging}
            onRegionWillChange={this.onRegionWillChange}
            onPress={this.onPress}
            zoomLevel={7}
            centerCoordinate={[-66.0978699, 48.9215969]}
            style={styles.container}
            showUserLocation={true}
            onUserLocationUpdate={this.onUserLocationUpdate}
            onDidFinishLoadingMap={this.onDidFinishLoadingMap}
            pitchEnabled={false}
            rotateEnabled={false}
            compassEnabled={true}
          >

          {generateLayers(geoJsonData)}
          
        </Mapbox.MapView>

        <Text style={styles.text}>{zoom}</Text>
        
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
  text: {
    flex: 1,
    position: 'absolute',
    top: 1,
    right: 1,
    fontSize:10
  },
});
