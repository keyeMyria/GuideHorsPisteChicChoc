import Mapbox from "@mapbox/react-native-mapbox-gl";

export const UPDATE_OFFLINE_REGION = "UPDATE_OFFLINE_REGION";
export const UPDATE_OFFLINE_ERROR = "UPDATE_OFFLINE_ERROR";

export function updateOfflineRegion(groupe, payload) {
  return { type: UPDATE_OFFLINE_REGION, groupe: groupe, payload };
}

export function updateOfflineError(groupe, payload) {
  return { type: UPDATE_OFFLINE_ERROR, groupe: groupe, payload };
}

export async function subscribeOfflinePacksToStore() {
  console.log("subscribeOfflinePacksToStore()");

  return (dispatch, getState) => {
    Mapbox.offlineManager
      .getPacks()
      .then(packs => {
        // console.log("packs", packs);
        for (const packName of packs) {
          // console.log("(",packName._metadata.name,")");
          packName.status().then(() => {
            // console.log("test",test);

            Mapbox.offlineManager
              .subscribe(
                packName._metadata.name,
                (offlineRegion, offlineRegionStatus) => {
                  const groupe = offlineRegion._metadata.name;

                  // console.log("updateOfflineRegion", groupe, offlineRegion, offlineRegionStatus);

                  dispatch(
                    updateOfflineRegion(groupe, {
                      offlineRegion,
                      offlineRegionStatus
                    })
                  );
                },
                (offlineRegion, message) => {
                  const groupe = offlineRegion._metadata.name;
                  dispatch(
                    updateOfflineError(groupe, {
                      offlineRegion,
                      error: message
                    })
                  );
                  // console.log("updateOfflineError", offlineRegion, message);
                }
              )
              .then(() => {
                console.log("DONE");
                packName.resume();
                // .then(test => {
                //  console.log("test3",test);
                // });
              })
              .catch(err => {
                console.error("error1", err);
              });
          });
        }
      })
      .catch(err => {
        console.error("error", err);
      });
  };
}
