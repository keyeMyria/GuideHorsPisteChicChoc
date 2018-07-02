import React, { Component } from "react";
import { YellowBox, ActivityIndicator, View } from "react-native";
import Permissions from "react-native-permissions";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureAppStore } from "./store";

import SplashScreen from "react-native-splash-screen";

import Mapbox from "@mapbox/react-native-mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "./utils/conf";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

import { prepareGeojsonData } from "./lib/geojsonManager";

import Routes from "./Routes";

import {
  subscribeLocalOfflinePacksToStore,
  populateOfflineRegionsToStore
} from "./actions/offline";

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"]);

const { persistor, store } = configureAppStore();

export default class App extends Component {
  constructor(props) {
    super(props);

    console.log("sllo");

    this.state = {
      locationPermission: "undetermined",
      geoJsonDataReady: false
    };
  }

  async componentDidMount() {
    console.log("App componentDidMount()");

    prepareGeojsonData();

    store.dispatch(populateOfflineRegionsToStore());

    store.dispatch(subscribeLocalOfflinePacksToStore());

    this.setState({ geoJsonDataReady: true });

    SplashScreen.hide();

    await Permissions.request("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      console.log("locationPermission:" + response);
      this.setState({ locationPermission: response });
    });

    console.log("App componentDidMount() done");
  }

  componentDidCatch(errorString, errorInfo) {
    console.log(errorString, errorInfo);
  }

  checkIfLoadingDone() {
    if (this.state.locationPermission == "authorized" && this.state.geoJsonDataReady == true)
      return true;
    else return false;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {this.checkIfLoadingDone() ? <Routes /> : <Spinner />}
        </PersistGate>
      </Provider>
    );
  }
}

const Spinner = () => (
  <View style={{ flex: 1 }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
