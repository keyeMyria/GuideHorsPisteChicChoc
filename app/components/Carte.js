import React, { Component } from "react";
import { Text, View, ToastAndroid } from "react-native";

//import { connect } from "react-redux";

import Mapbox from "@mapbox/react-native-mapbox-gl";

import { MAPBOX_MAP_STYLE } from "../utils/conf";
//Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

import geojsonExtent from "@mapbox/geojson-extent";

import { getGroupeNameFromFeatures, getBoundingBoxFromGroupe } from "../lib/geojsonManager";

import { getScreenBoundingBox } from "../lib/screen";
import { generateLayers } from "./layer/Layer";

import geoJsonLayer from "../assets/geoJsonLayer.json";

import { Fab } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

//import { subscribeOfflineMapsToStore } from "../lib/offlineManager";

export default class Carte extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastLocation: undefined,
      zoom: 0
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onRegionIsChanging = this.onRegionIsChanging.bind(this);
    //this.regionWillChange = this.regionWillChange.bind(this);
  }

  async componentDidMount() {
    console.log("Carte componentDidMount ", this.props);
  }

  onUserLocationUpdate(location) {
    this.setState({ lastLocation: location });
    console.log("location: ", location);
  }

  async onRegionDidChange() {
    console.log("onRegionDidChange");
    const zoom = await this._map.getZoom();
    await console.log("zoom: ", zoom);
    this.setState({ zoom });
  }

  //async regionWillChange() {
  //  console.log("regionWillChange");
  //  const zoom = await this._map.getZoom();
  //  this.setState({ zoom });
  //}

  async onRegionIsChanging() {
    const zoom = await this._map.getZoom();
    console.log("onRegionIsChanging ", zoom);
    this.setState({ zoom });
  }

  async onDidFinishLoadingMap() {
    console.log("onDidFinishLoadingMap");
    await this.zoomToFeatures(global.geoJsonData);
    //await subscribeOfflineMapsToStore(this.props.offline_status, this.props.dispatch);
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

    //console.log("Carte render");

    //this._scaleIn = new Animated.Value(0.6);
    //let animationStyle = {};
    //animationStyle.transform = [{ scale: this._scaleIn }];

    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          styleURL={MAPBOX_MAP_STYLE}
          logoEnabled={false}
          ref={c => (this._map = c)}
          onRegionDidChange={this.onRegionDidChange}
          onRegionIsChanging={this.onRegionIsChanging}
          //onRegionWillChange={this.onRegionWillChange}
          onPress={this.onPress}
          zoomLevel={7}
          centerCoordinate={[-66.0978699, 48.9215969]}
          style={{ flex: 1 }}
          showUserLocation={true}
          onUserLocationUpdate={this.onUserLocationUpdate}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          pitchEnabled={false}
          rotateEnabled={false}
          compassEnabled={true}
          //animated={true}
          userTrackingMode={Mapbox.UserTrackingModes.FolloWithHeading}>
          {generateLayers(global.geoJsonData)}
        </Mapbox.MapView>

        <Text
          style={{
            flex: 1,
            position: "absolute",
            top: 20,
            right: 1,
            fontSize: 10
          }}>
          {zoom}
        </Text>

        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => {
            console.log(this.state.lastLocation);
            if (this.state.lastLocation) this._map.flyTo([this.state.lastLocation.coords.longitude, this.state.lastLocation.coords.latitude], 2000);
          }}>
          <Icon name="my-location" />
        </Fab>
      </View>
    );
  }
}

//const mapStateToProps = state => ({
//  offline_status: state.offline_status
//});

//export default connect(mapStateToProps)(Carte);

//const ANNOTATION_SIZE = 20;
//const styles = StyleSheet.create({
//  annotationContainer: {
//    width: ANNOTATION_SIZE + 10,
//    height: ANNOTATION_SIZE + 10,
//    alignItems: "center",
//    justifyContent: "center",
//    backgroundColor: "rgba(30, 144, 255, 0.4)",
//    borderRadius: ANNOTATION_SIZE / 2,
//    borderWidth: StyleSheet.hairlineWidth,
//    borderColor: "rgba(0, 0, 0, 0.8)"
//  },
//  annotationFill: {
//    width: ANNOTATION_SIZE - 3,
//    height: ANNOTATION_SIZE - 3,
//    borderRadius: (ANNOTATION_SIZE - 3) / 2,
//    backgroundColor: "blue",
//    transform: [{ scale: 0.6 }]
//  }
//});
//
//<Mapbox.PointAnnotation
//id="3"
//title="Test"
//selected={false}
////onSelected={feature => this.onAnnotationSelected(i, feature)}
////onDeselected={() => this.onAnnotationDeselected(i)}
//coordinate={[-66.17416028, 48.97479888]}>
//<View style={styles.annotationContainer}>
//  <View style={styles.annotationFill} />
//</View>
//
//<Mapbox.Callout title={"allo"} />
//</Mapbox.PointAnnotation>

//<MapView.Circle
//key={(this.state.longitude + this.state.latitude).toString()}
//center={{
//  latitude: this.state.latitude,
//  longitude: this.state.longitude
//}}
//radius={100}
//strokeWidth={1}
//strokeColor={"#1a66ff"}
//fillColor={"#1a66ff"}
///>
