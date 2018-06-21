import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
//import { logger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["offline_status"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureAppStore = () => {
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return { store, persistor };
};
