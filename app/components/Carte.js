import React, { Component } from "react";
import { Text, View, ToastAndroid } from "react-native";

import Mapbox from "@mapbox/react-native-mapbox-gl";

import { MAPBOX_MAP_STYLE } from "../utils/conf";
//Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

import geojsonExtent from "@mapbox/geojson-extent";

import { getGroupeNameFromFeatures, getBoundingBoxFromGroupe } from "../lib/geojsonManager";

import { getScreenBoundingBox } from "../lib/screen";
import { generateLayers } from "./layer/Layer";

import geoJsonLayer from "../assets/geoJsonLayer.json";

export default class Carte extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastLocation: {},
      zoom: 0
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);
    this.onPress = this.onPress.bind(this);
    //this.onRegionIsChanging = this.onRegionIsChanging.bind(this);
    this.regionWillChange = this.regionWillChange.bind(this);
  }

  async componentDidMount() {
    console.log("Carte componentDidMount ", global.geoJsonData);
  }

  onUserLocationUpdate(location) {
    this.setState({ lastLocation: location });
  }

  async onRegionDidChange() {
    console.log("onRegionDidChange");
    const zoom = await this._map.getZoom();
    this.setState({ zoom });
    //this.setState({ loading: false })
  }

  async regionWillChange() {
    console.log("regionWillChange");
    const zoom = await this._map.getZoom();
    this.setState({ zoom });
  }

  //async onRegionIsChanging() {
  //  console.log('onRegionIsChanging');
  //  const zoom = await this._map.getZoom();
  //  this.setState({ zoom });
  //}

  async onDidFinishLoadingMap() {
    console.log("onDidFinishLoadingMap");
    await this.zoomToFeatures(global.geoJsonData);
    //SplashScreen.hide();
    console.log("onDidFinishLoadingMap done");
  }

  async zoomToFeatures(featuresToBounds, animation_time = 1) {
    const bounds = geojsonExtent(featuresToBounds);
    await this._map.fitBounds([bounds[2], bounds[3]], [bounds[0], bounds[1]], [5, 10, 5, 5], animation_time);
  }

  async onPress(e) {
    console.log("onPress");

    const selectedFeatures = await this._map.queryRenderedFeaturesInRect(
      getScreenBoundingBox(e.properties.screenPointX, e.properties.screenPointY),
      null,
      geoJsonLayer.map(item => item.name)
    );

    const groupename = getGroupeNameFromFeatures(selectedFeatures);

    if (groupename.length > 0) {
      console.log("zooming to groupename " + groupename[0]);
      const featuresToBounds = getBoundingBoxFromGroupe(global.geoJsonData, "groupe", groupename[0]);
      await this.zoomToFeatures(featuresToBounds, 150);
    } else {
      if (selectedFeatures.features.length > 0) {
        ToastAndroid.show(selectedFeatures.features[0].properties.element + ": " + selectedFeatures.features[0].properties.name, ToastAndroid.SHORT);
        console.log(selectedFeatures.features[0]);
      }
    }
  }

  render() {
    const zoom = Number(this.state.zoom).toFixed(1);

    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          styleURL={MAPBOX_MAP_STYLE}
          logoEnabled={false}
          ref={c => (this._map = c)}
          onRegionDidChange={this.onRegionDidChange}
          //onRegionIsChanging={this.onRegionIsChanging}

          onRegionWillChange={this.onRegionWillChange}
          onPress={this.onPress}
          zoomLevel={7}
          centerCoordinate={[-66.0978699, 48.9215969]}
          style={{ flex: 1 }}
          showUserLocation={true}
          onUserLocationUpdate={this.onUserLocationUpdate}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          pitchEnabled={false}
          rotateEnabled={false}
          compassEnabled={true}>
          {generateLayers(global.geoJsonData)}
        </Mapbox.MapView>

        <Text
          style={{
            flex: 1,
            position: "absolute",
            top: 1,
            right: 1,
            fontSize: 10
          }}>
          {zoom}
        </Text>
      </View>
    );
  }
}
