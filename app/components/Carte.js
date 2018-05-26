import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Bubble from "./Bubble";

import Mapbox from "@mapbox/react-native-mapbox-gl";
import geoViewport from "@mapbox/geo-viewport";

import { MAPBOX_ACCESS_TOKEN, MAPBOX_MAP_STYLE } from "../utils/conf";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

import geojsonExtent from "@mapbox/geojson-extent";

import {
  getSourceData,
  getBoundingBoxFromGroupe,
  applySplineToLineString,
  addArrowToLigne,
  getGroupeNameFromFeatures
} from "../lib/geojson";
import { getScreenBoundingBox } from "../lib/screen";
import { generateLayers } from "./layer/Layer";

import geoJsonData from "../assets/all.json";
import geoJsonLayer from "../assets/geoJsonLayer.json";

import SplashScreen from "react-native-splash-screen";

const CENTER_COORD = [-73.970895, 40.723279];
const MAPBOX_VECTOR_TILE_SIZE = 512;

export default class Carte extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastLocation: {},
      zoom: 0,
      offlineRegion: null,
      offlineRegionStatus: null,
      name: "na"
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);
    this.onPress = this.onPress.bind(this);

    //this.onRegionIsChanging = this.onRegionIsChanging.bind(this);
    this.regionWillChange = this.regionWillChange.bind(this);

    this.onDownloadProgress = this.onDownloadProgress.bind(this);
    this.onResume = this.onResume.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStatusRequest = this.onStatusRequest.bind(this);
  }

  async componentDidMount() {
    console.log("Carte componentDidMount");

    const offlinePacks = await Mapbox.offlineManager.getPacks();
    await offlinePacks.map((pack, index) => {
      console.log(index, pack);
      console.log(pack._metadata.name);
      Mapbox.offlineManager.deletePack(pack._metadata.name);
    });

    applySplineToLineString(geoJsonData);
    addArrowToLigne(geoJsonData);

    console.log("Carte componentDidMount done");
  }

  componentDidCatch(errorString, errorInfo) {
    console.log(errorString, errorInfo);
  }

  componentWillUnmount() {
    console.log("Carte componentWillUnmount");

    // avoid setState warnings if we back out before we finishing downloading
    //Mapbox.offlineManager.deletePack(this.state.name);
    //Mapbox.offlineManager.unsubscribe("test");
  }

  onUserLocationUpdate(location) {
    //console.log('onUserLocationUpdate', location);
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

  onDownloadProgress(offlineRegion, offlineRegionStatus) {
    this.setState({
      name: offlineRegion.name,
      offlineRegion: offlineRegion,
      offlineRegionStatus: offlineRegionStatus
    });
  }

  async onDidFinishLoadingMap() {
    console.log("onDidFinishLoadingMap");
    await this.zoomToFeatures(geoJsonData);
    SplashScreen.hide();

    const { width, height } = Dimensions.get("window");
    const bounds1 = geoViewport.bounds(
      CENTER_COORD,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE
    );
    console.log("bounds1", bounds1);

    //await console.log(offlinePacks);

    const featuresToBounds = getSourceData(
      geoJsonData,
      "groupe",
      "zone-chicchoc"
    );
    const bounds = geojsonExtent(featuresToBounds);
    console.log(bounds);

    //const options = {
    //  name: "secteur-hogs",
    //  styleURL: MAPBOX_MAP_STYLE,
    //  bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
    //  minZoom: 10,
    //  maxZoom: 16
    //};

    const options = {
      name: "zone-chicchoc",
      styleURL: MAPBOX_MAP_STYLE,
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 9,
      maxZoom: 20
    };

    //Mapbox.offlineManager.deletePack("test2");
    //Mapbox.offlineManager.unsubscribe("test");

    // start download
    //    Mapbox.offlineManager.createPack(options, this.onDownloadProgress);

    //const options = {
    //  name: "vallieres",
    //  styleURL: { MAPBOX_MAP_STYLE },
    //  bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
    //  minZoom: 10,
    //  maxZoom: 20
    //};
    //
    //const progressListener = (offlineRegion, status) =>
    //  console.log(offlineRegion, status);
    //const errorListener = (offlineRegion, err) =>
    //  console.log(offlineRegion, err);
    //
    //// start download
    //Mapbox.offlineManager.createPack(options, progressListener, errorListener);

    console.log("onDidFinishLoadingMap done");
  }

  onResume() {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.resume();
    }
  }

  onPause() {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.pause();
    }
  }

  async onStatusRequest() {
    if (this.state.offlineRegion) {
      const offlineRegionStatus = await this.state.offlineRegion.status();
      console.log("Get Status", JSON.stringify(offlineRegionStatus, null, 2));
      //Alert.alert("Get Status", JSON.stringify(offlineRegionStatus, null, 2));
    }
  }

  _formatPercent() {
    if (!this.state.offlineRegionStatus) {
      return "0%";
    }
    return Math.round(this.state.offlineRegionStatus.percentage / 10) / 10;
  }

  _getRegionDownloadState(downloadState) {
    switch (downloadState) {
      case Mapbox.OfflinePackDownloadState.Active:
        return "Active";
      case Mapbox.OfflinePackDownloadState.Complete:
        return "Complete";
      default:
        return "Inactive";
    }
  }

  async zoomToFeatures(featuresToBounds, animation_time = 1) {
    const bounds = geojsonExtent(featuresToBounds);
    await this._map.fitBounds(
      [bounds[2], bounds[3]],
      [bounds[0], bounds[1]],
      [5, 10, 5, 5],
      animation_time
    );
  }

  async onPress(e) {
    console.log("onPress");

    const selectedFeatures = await this._map.queryRenderedFeaturesInRect(
      getScreenBoundingBox(
        e.properties.screenPointX,
        e.properties.screenPointY
      ),
      null,
      geoJsonLayer.map(item => item.name)
    );

    const groupename = getGroupeNameFromFeatures(selectedFeatures);

    if (groupename.length > 0) {
      console.log("zooming to groupename " + groupename[0]);
      const featuresToBounds = getBoundingBoxFromGroupe(
        geoJsonData,
        "groupe",
        groupename[0]
      );
      await this.zoomToFeatures(featuresToBounds, 150);
    } else {
      if (selectedFeatures.features.length > 0) {
        ToastAndroid.show(
          selectedFeatures.features[0].properties.element +
            ": " +
            selectedFeatures.features[0].properties.name,
          ToastAndroid.SHORT
        );
        console.log("feature selected" + selectedFeatures.features[0]);
      }
    }
  }

  render() {
    const zoom = Number(this.state.zoom).toFixed(1);
    const offlineRegionStatus = this.state.offlineRegionStatus;

    return (
      <View style={styles.container}>
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

        {offlineRegionStatus !== null ? (
          <Bubble>
            <View style={{ flex: 1 }}>
              <Text>
                Download State:{" "}
                {this._getRegionDownloadState(offlineRegionStatus.state)}
              </Text>
              <Text>Download Percent: {offlineRegionStatus.percentage}</Text>
              <Text>
                Completed Resource Count:{" "}
                {offlineRegionStatus.completedResourceCount}
              </Text>
              <Text>
                Completed Resource Size:{" "}
                {offlineRegionStatus.completedResourceSize}
              </Text>
              <Text>
                Completed Tile Count: {offlineRegionStatus.completedTileCount}
              </Text>
              <Text>
                Required Resource Count:{" "}
                {offlineRegionStatus.requiredResourceCount}
              </Text>

              <View style={styles.buttonCnt}>
                <TouchableOpacity onPress={this.onResume}>
                  <View style={styles.button}>
                    <Text style={styles.buttonTxt}>Resume</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onStatusRequest}>
                  <View style={styles.button}>
                    <Text style={styles.buttonTxt}>Status</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onPause}>
                  <View style={styles.button}>
                    <Text style={styles.buttonTxt}>Pause</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Bubble>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    flexDirection: "column",
    position: "absolute"
  },
  container: {
    flex: 1
  },
  text: {
    flex: 1,
    position: "absolute",
    top: 1,
    right: 1,
    fontSize: 10
  },
  percentageText: {
    padding: 8,
    textAlign: "center"
  },
  buttonCnt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: "blue",
    padding: 8
  },
  buttonTxt: {
    color: "white"
  }
});
