import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import storage from "redux-persist/lib/storage";

//const loggerMiddleware = createLogger();

//const store = createStore(rootReducer, compose(
//  applyMiddleware(loggerMiddleware), //applyMiddleware(thunk, loggerMiddleware)
//  autoRehydrate()
//));
//
//persistStore(store, { store: AsyncStorage });
//
//export default store;

//const middleware = [loggerMiddleware]; //[thunk, loggerMiddleware];

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["offline_status"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureAppStore = () => {
  let store = createStore(persistedReducer); //, compose(applyMiddleware(logger)));
  let persistor = persistStore(store);
  return { store, persistor };
};
