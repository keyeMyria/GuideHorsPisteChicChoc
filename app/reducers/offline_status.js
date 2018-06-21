import { getInitialState } from "../lib/offlineManager";

const offline_status = (state = getInitialState(), action) => {
  switch (action.type) {
    case "UPDATE_OFFLINE_REGION":
      // console.log("action", action);
      return {
        ...state,
        [action.groupe]: {
          ...state[action.groupe],
          offlineRegion: action.payload.offlineRegion,
          offlineRegionStatus: action.payload.offlineRegionStatus
        }
      };
    case "UPDATE_OFFLINE_ERROR":
      return {
        ...state,
        [action.groupe]: {
          ...state[action.groupe],
          error: action.payload.error
        }
      };
    default:
      return state;
  }
};

export default offline_status;
