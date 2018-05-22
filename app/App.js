import React, { Component } from "react";
import { YellowBox } from "react-native";
import Permissions from "react-native-permissions";

import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { addRapport } from "./actions";

import Routes from "./Routes";



import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(rootReducer, applyMiddleware(logger));

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationPermission: "undetermined"
    };

    console.log(store.getState());

    const unsubscribe = store.subscribe(() => console.log(store.getState()));

    store.dispatch(
      addRapport({
        id: 3432432423,
        emplacement: "valliere",
        taille_avalanche: 3,
        datetime: "12/12/2018",
        declenchement: 2,
        type_avalanche: 1,
        plan_glissement: 2,
        info_complementaires: "fxgourdeau@hotmail.com"
      })
    );

    unsubscribe();
  }

  componentDidMount() {
    console.log("componentDidMount");

    Permissions.request("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
    //if (this.state.locationPermission != 'authorized') {
    //  return <LoadingScreen />;
    //}
    //return <Routes />;
  }
}
