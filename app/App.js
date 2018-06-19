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

import { subscribeOfflineMapsToStore } from "./lib/offlineManager";

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"]);

const { persistor, store } = configureAppStore();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationPermission: "undetermined",
      geoJsonDataReady: false
    };

    //console.log(store.getState());

    //const unsubscribe =
    //store.subscribe(() => console.log(store.getState()));

    //store.dispatch(
    //  addRapport({
    //    id: 3432432423,
    //    emplacement: "valliere",
    //    taille_avalanche: 3,
    //    datetime: "12/12/2018",
    //    declenchement: 2,
    //    type_avalanche: 1,
    //    plan_glissement: 2,
    //    info_complementaires: "fxgourdeau@hotmail.com"
    //  })
    //);

    //store.dispatch({
    //  type: PURGE,
    //  key: "root",
    //  result: () => null
    //});

    //unsubscribe();
  }

  async componentDidMount() {
    console.log("App componentDidMount()");



    prepareGeojsonData();

    await subscribeOfflineMapsToStore(store.getState().offline_status, store.dispatch);

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
    if (this.state.locationPermission == "authorized" && this.state.geoJsonDataReady == true) return true;
    else return false;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>{this.checkIfLoadingDone() ? <Routes /> : <Spinner />}</PersistGate>
      </Provider>
    );
  }
}

const Spinner = () => (
  <View style={{ flex: 1 }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
