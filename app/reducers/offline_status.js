import {
  ADD_OFFLINE_REGION,
  UPDTATE_MAP_STATUS,
  UPDATE_OFFLINE_REGION,
  UPDATE_OFFLINE_ERROR
} from "../actions/offline";

const offline_status = (state = {}, action) => {
  //console.log("action", action);
  switch (action.type) {
    case ADD_OFFLINE_REGION:
      return {
        ...state,
        [action.groupe]: {
          ...state[action.groupe],
          ...action.payload
        }
      };
    case UPDTATE_MAP_STATUS:
      return {
        ...state,
        [action.groupe]: {
          ...state[action.groupe],
          pack_status: action.payload.pack_status
        }
      };
    case UPDATE_OFFLINE_REGION:
      return {
        ...state,
        [action.groupe]: {
          ...state[action.groupe],
          offlineRegion: action.payload.offlineRegion,
          offlineRegionStatus: action.payload.offlineRegionStatus,
          error: undefined
        }
      };
    case UPDATE_OFFLINE_ERROR:
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
