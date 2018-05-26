import { combineReducers } from "redux";
import rapports from "./rapports";
import purge from "./purge";
//import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  rapports,
  purge
});

export default rootReducer;
