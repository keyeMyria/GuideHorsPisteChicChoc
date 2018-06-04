import React, { Component } from "react";
import { YellowBox } from "react-native";
import Permissions from "react-native-permissions";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureAppStore } from "./store";

import SplashScreen from "react-native-splash-screen";

//import rootReducer from "./reducers";
//import { addRapport } from "./actions";
//import { applyMiddleware, createStore } from "redux";
//import logger from "redux-logger";
//import { PURGE } from "redux-persist";

//import { applySplineToLineString, addArrowToLigne } from "../lib/geojson";
//import geoJsonData from "../assets/all.json";

import { prepareGeojsonData } from "./lib/geojsonManager";

import Routes from "./Routes";

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"]);

//const store = createStore(rootReducer, applyMiddleware(logger));

const { persistor, store } = configureAppStore();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationPermission: "undetermined"
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

  componentDidMount() {
    console.log("componentDidMount");

    Permissions.request("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });

    prepareGeojsonData();

    SplashScreen.hide();
  }

  componentDidCatch(errorString, errorInfo) {
    console.log(errorString, errorInfo);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
    //if (this.state.locationPermission != 'authorized') {
    //  return <LoadingScreen />;
    //}
    //return <Routes />;
  }
}
