import Mapbox from "@mapbox/react-native-mapbox-gl";
import { MAPBOX_MAP_STYLE } from "../utils/conf";

import geojsonExtent from "@mapbox/geojson-extent";
import { getSourceData } from "../lib/geojsonManager";
import geoJsonSourceData from "../assets/all.json";

export const ADD_OFFLINE_REGION = "ADD_OFFLINE_REGION";
export const UPDTATE_MAP_STATUS = "UPDTATE_MAP_STATUS";
export const UPDATE_OFFLINE_REGION = "UPDATE_OFFLINE_REGION";
export const UPDATE_OFFLINE_ERROR = "UPDATE_OFFLINE_ERROR";

export const pack_status = {
  NOT_DOWNLOADED: 1,
  RESUMING: 2,
  DOWNLOAD_WILL_START: 3,
  DOWNLOADING: 4,
  DOWNLOADED: 5,
  PAUSED: 6,
  ERROR: 7
};

export function addOfflineRegion(groupe, payload) {
  return { type: ADD_OFFLINE_REGION, groupe: groupe, payload };
}

function updateMapStatus(groupe, payload) {
  return { type: UPDTATE_MAP_STATUS, groupe: groupe, payload };
}

function updateOfflineRegion(groupe, payload) {
  return { type: UPDATE_OFFLINE_REGION, groupe: groupe, payload };
}

function updateOfflineError(groupe, payload) {
  return { type: UPDATE_OFFLINE_ERROR, groupe: groupe, payload };
}

export function populateOfflineRegionsToStore() {
  return dispatch => {
    const featuresToBounds = getSourceData(geoJsonSourceData, "element", "boundingbox");

    featuresToBounds.features.map(feature => {
      const groupe = feature.properties.groupe;

      let minZoom = 12;
      let maxZoom = 15;
      if (feature.properties.zoom === "gaspesie") {
        minZoom = 7;
        maxZoom = 8;
      } else if (feature.properties.zoom === "zone") {
        minZoom = 10;
        maxZoom = 11;
      } else if (feature.properties.zoom === "secteur") {
        minZoom = 12;
        maxZoom = 15;
      }

      dispatch(
        addOfflineRegion(groupe, {
          groupe,
          name: feature.properties.name,
          bounds: geojsonExtent(feature),
          pack_status: pack_status.NOT_DOWNLOADED,
          offlineRegion: undefined,
          offlineRegionStatus: undefined,
          minZoom,
          maxZoom,
          error: undefined
        })
      );
    });
  };
}

export function subscribeLocalOfflinePacksToStore() {
  return dispatch => {
    console.log("subscribeOfflineMapsToStore()");

    const progressListener = (offlinePack, status) =>
      dispatch(onMapDownloadProgress(offlinePack, status));
    const errorListener = (offlinePack, err) => dispatch(onMapDownloadError(offlinePack, err));

    Mapbox.offlineManager
      .getPacks()
      .then(packs => {
        // console.log("packs", packs);
        for (const packName of packs) {
          packName.status().then(() => {
            const groupe_name = packName._metadata.name;

            dispatch(updateMapStatus(groupe_name, { pack_status: pack_status.RESUMING }));

            Mapbox.offlineManager
              .subscribe(groupe_name, progressListener, errorListener)
              .then(() => {
                console.log("DONE");
                packName.resume();
              })
              .catch(err => {
                console.error("error", err);
              });
          });
        }
      })
      .catch(err => {
        console.error("error", err);
      });
  };
}

export function startMapDownload(item) {
  return dispatch => {
    console.log("startMapDownload()", item);

    dispatch(updateMapStatus(item.groupe, { pack_status: pack_status.DOWNLOAD_WILL_START }));

    const progressListener = (offlinePack, status) =>
      dispatch(onMapDownloadProgress(offlinePack, status));
    const errorListener = (offlinePack, err) => dispatch(onMapDownloadError(offlinePack, err));

    const options = {
      name: item.groupe,
      styleURL: MAPBOX_MAP_STYLE,
      bounds: [[item.bounds[0], item.bounds[1]], [item.bounds[2], item.bounds[3]]],
      minZoom: item.minZoom,
      maxZoom: item.maxZoom
    };
    Mapbox.offlineManager.createPack(options, progressListener, errorListener);
  };
}

export function deleteMap(item) {
  return dispatch => {
    Mapbox.offlineManager.deletePack(item.groupe);

    dispatch(updateMapStatus(item.groupe, { pack_status: pack_status.NOT_DOWNLOADED }));

    dispatch(
      updateOfflineRegion(item.groupe, {
        offlineRegion: undefined,
        offlineRegionStatus: undefined
      })
    );
  };
}

export function resumePack(item) {
  return dispatch => {
    item.offlineRegion.resume();

    dispatch(updateMapStatus(item.groupe, { pack_status: pack_status.RESUMING }));
  };
}

export function pausePack(item) {
  return dispatch => {
    item.offlineRegion.pause();

    dispatch(updateMapStatus(item.groupe, { pack_status: pack_status.PAUSED }));
  };
}

function onMapDownloadProgress(offlineRegion, offlineRegionStatus) {
  return async dispatch => {
    //console.log("offlineRegion", offlineRegion);
    //console.log("offlineRegionStatus", offlineRegionStatus);

    const { name, state } = offlineRegionStatus;

    dispatch(
      updateOfflineRegion(name, {
        offlineRegion,
        offlineRegionStatus
      })
    );

    if (state === Mapbox.OfflinePackDownloadState.Complete)
      dispatch(updateMapStatus(name, { pack_status: pack_status.DOWNLOADED }));
    else dispatch(updateMapStatus(name, { pack_status: pack_status.DOWNLOADING }));
  };
}

function onMapDownloadError(offlineRegion, message) {
  return async dispatch => {
    //console.log("offlineRegionerror", offlineRegion);

    const groupe = offlineRegion._metadata.name;

    dispatch(updateMapStatus(name, { pack_status: pack_status.ERROR }));

    dispatch(
      updateOfflineError(groupe, {
        offlineRegion,
        error: message
      })
    );
  };
}
