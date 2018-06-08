export const ADD_RAPPORT = "ADD_RAPPORT";

export const UPDATE_OFFLINE_REGION = "UPDATE_OFFLINE_REGION";
export const UPDATE_OFFLINE_ERROR = "UPDATE_OFFLINE_ERROR";

export function addRapport(payload) {
  return { type: ADD_RAPPORT, payload };
}

export function updateOfflineRegion(groupe, payload) {
  return { type: UPDATE_OFFLINE_REGION, groupe: groupe, payload };
}

export function updateOfflineError(groupe, payload) {
  return { type: UPDATE_OFFLINE_ERROR, groupe: groupe, payload };
}
