import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { addRapport } from "./actions";
import { persistStore, persistCombineReducers } from "redux-persist";
import { AsyncStorage } from "react-native";


import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import user from "./reducers/user";
import auth from "./reducers/auth";

const config = {
  key: "root",
  storage: AsyncStorage
};

const reducers = persistCombineReducers(config, {
  user,
  auth
});

export const configureStore = () => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  return { persistor, store };
};
