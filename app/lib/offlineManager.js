import Mapbox from "@mapbox/react-native-mapbox-gl";
//import { MAPBOX_MAP_STYLE } from "../utils/conf";

import geojsonExtent from "@mapbox/geojson-extent";
import { getSourceData } from "../lib/geojsonManager";
import geoJsonSourceData from "../assets/all.json";

import { updateOfflineRegion, updateOfflineError } from "../actions";

import { MAPBOX_MAP_STYLE } from "../utils/conf";

export function getInitialState() {
  const initialState = {};
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

    initialState[groupe] = {
      groupe: groupe,
      name: feature.properties.name,
      bounds: geojsonExtent(feature),
      offlineRegion: undefined,
      offlineRegionStatus: undefined,
      minZoom: minZoom,
      maxZoom: maxZoom,
      error: undefined
    };
  });

  return initialState;
}

export async function subscribeOfflineMapsToStore(offline_status, dispatch) {
  console.log("subscribeOfflineMapsToStore()1");

  const progressListener = (offlinePack, status) => console.log(offlinePack, status)
  const errorListener = (offlinePack, err) => console.log(offlinePack, err)


  //Mapbox.offlineManager.getPacks()
  //  .then(packs => {
  //    console.log("packs", packs);
  //    for (let packName of packs) {
  //      console.log("(",packName._metadata.name,")");
  //      packName.status().then(test => {
  //        console.log("test",test);
  //        Mapbox.offlineManager.subscribe(packName._metadata.name, progressListener, errorListener).then(() => {
  //          console.log("DONE");
  //          packName.resume();
  //          //.then(test => {
  //          //  console.log("test3",test);
  //          //});
  //          
  //        }).catch(err => {
  //          console.error("error1",err);
  //        });
  //    });
  //      
  //    }
  //  }).catch(err => {
  //    console.error("error",err);
  //  });







  Mapbox.offlineManager.getPacks()
  .then(packs => {
    console.log("packs", packs);
    for (let packName of packs) {
      console.log("(",packName._metadata.name,")");
      packName.status().then(test => {
        console.log("test",test);



        Mapbox.offlineManager.subscribe(
          packName._metadata.name,
          (offlineRegion, offlineRegionStatus) => {
            const groupe = offlineRegion._metadata.name;
  
            console.log("updateOfflineRegion", groupe, offlineRegion, offlineRegionStatus);
  
            dispatch(
              updateOfflineRegion(groupe, {
                offlineRegion: offlineRegion,
                offlineRegionStatus: offlineRegionStatus
              })
            );
          },
          (offlineRegion, message) => {
            const groupe = offlineRegion._metadata.name;
            dispatch(
              updateOfflineError(groupe, {
                offlineRegion: offlineRegion,
                error: message
              })
            );
            console.log("updateOfflineError", offlineRegion, message);
          }
        ).then(() => {
          console.log("DONE");
          packName.resume();
          //.then(test => {
          //  console.log("test3",test);
          //});
          
        }).catch(err => {
          console.error("error1",err);
        });

    });
      
    }
  }).catch(err => {
    console.error("error",err);
  });



return;

  //const offlinePacks = await Mapbox.offlineManager.getPacks();




  //console.log("mapbox", Mapbox.offlineManager);

  //let storeState = store.getState();

  Object.keys(offline_status).map(async function(item) {

    //const status = await Mapbox.offlineManager.getPackStatus(item);
    //console.log("status", status);


    const pack = Mapbox.offlineManager.getPack(item);
    console.log(pack);

    if (pack != undefined) {
      console.log("subscribe ", item);
      Mapbox.offlineManager.subscribe(
        item,
        (offlineRegion, offlineRegionStatus) => {
          const groupe = offlineRegion._metadata.name;

          console.log("updateOfflineRegion", groupe, offlineRegion, offlineRegionStatus);

          dispatch(
            updateOfflineRegion(groupe, {
              offlineRegion: offlineRegion,
              offlineRegionStatus: offlineRegionStatus
            })
          );
        },
        (offlineRegion, message) => {
          const groupe = offlineRegion._metadata.name;
          dispatch(
            updateOfflineError(groupe, {
              offlineRegion: offlineRegion,
              error: message
            })
          );
          console.log("updateOfflineError", offlineRegion, message);
        }
      );
    }
  });








}

export function startMapDownload(item, dispatch) {
  const options = {
    name: item.groupe,
    styleURL: MAPBOX_MAP_STYLE,
    bounds: [[item.bounds[0], item.bounds[1]], [item.bounds[2], item.bounds[3]]],
    minZoom: item.minZoom,
    maxZoom: item.maxZoom
  };
  Mapbox.offlineManager.createPack(
    options,
    (offlineRegion, offlineRegionStatus) => {
      const groupe = offlineRegionStatus.name;

      console.log("startMapDownload", groupe, offlineRegion, offlineRegionStatus);

      dispatch(
        updateOfflineRegion(groupe, {
          offlineRegion: offlineRegion,
          offlineRegionStatus: offlineRegionStatus
        })
      );
    },
    (offlineRegion, message) => {
      const groupe = message.name;
      //console.log("startMapDownloaderror", groupe, offlineRegion, message);
      dispatch(
        updateOfflineError(groupe, {
          error: message
        })
      );
      //console.log("updateOfflineError", offlineRegion, message);
    }
  );
}

export function deleteMap(item, dispatch) {
  Mapbox.offlineManager.deletePack(item.groupe);

  dispatch(
    updateOfflineError(item.groupe, {
      offlineRegion: undefined,
      error: undefined
    })
  );

  dispatch(
    updateOfflineRegion(item.groupe, {
      offlineRegion: undefined,
      offlineRegionStatus: undefined
    })
  );
}
