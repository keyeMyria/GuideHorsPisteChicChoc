import { combineReducers } from "redux";
import rapports from "./rapports";
import purge from "./purge";
import offline_status from "./offline_status";
//import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  rapports,
  offline_status,
  purge
});

export default rootReducer;
