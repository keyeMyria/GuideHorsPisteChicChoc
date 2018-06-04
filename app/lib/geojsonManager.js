import destination from "@turf/destination";
import bearing from "@turf/bearing";
import bezier from "turf-bezier";

import geoJsonSourceData from "../assets/all.json";

export function prepareGeojsonData() {
  geoJsonSourceData.features.map(data => {
    if (data.properties.element == "ligne") {
      var y = Object.assign({}, data);

      try {
        var z = bezier(y, 5000, 0.7);
        var a = addArrowToLigne(z);
        Object.assign(data, a);
      } catch (error) {
        console.error("error:", error);
      }
    }
    return data;
  });

  global.geoJsonData = Object.assign({}, geoJsonSourceData);
}

export function addArrowToLigne(data) {
  var y = Object.assign({}, data);

  const lastpoint = y.geometry.coordinates[y.geometry.coordinates.length - 1];
  const refpoint = y.geometry.coordinates[y.geometry.coordinates.length - 20];

  const angle = bearing(lastpoint, refpoint);

  const firstarrow = destination(lastpoint, 35, angle + 35, { units: "meters" });
  const secondarrow = destination(lastpoint, 35, angle - 35, { units: "meters" });

  y.geometry.coordinates.push(firstarrow.geometry.coordinates);

  //y.geometry.coordinates.push(refpoint);

  y.geometry.coordinates.push(lastpoint);

  y.geometry.coordinates.push(secondarrow.geometry.coordinates);

  Object.assign(data, y);

  return data;
}

export function getSourceData(source, propertie, type) {
  const featuresToRender = { features: [], type: "FeatureCollection" };

  source.features.filter(data => {
    if (data.properties[propertie] == type) featuresToRender.features.push(data);
  });

  return featuresToRender;
}

export function getBoundingBoxFromGroupe(source, propertie, type) {
  const featuresToRender = { features: [], type: "FeatureCollection" };

  source.features.filter(data => {
    if (data.properties[propertie] == type && data.properties.element == "boundingbox") featuresToRender.features.push(data);
  });

  //console.log(featuresToRender);

  return featuresToRender;
}

export function getGroupeNameFromFeatures(selectedFeatures) {
  const containsGroupeName = item => {
    if (item.properties.groupename) if (item.properties.groupename.length > 0) return true;

    return false;
  };
  const extractGroupeName = item => item.properties.groupename;

  return selectedFeatures.features.filter(containsGroupeName).map(extractGroupeName);
}
