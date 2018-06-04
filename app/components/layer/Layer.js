import React from "react";
import Mapbox from "@mapbox/react-native-mapbox-gl";

import { getSourceData } from "../../lib/geojsonManager";
import { styles } from "./Style";
import geoJsonLayer from "../../assets/geoJsonLayer.json";

export function generateLayers(source) {
  const layers = [];

  geoJsonLayer.map(layer => {
    var featuresToRender = getSourceData(source, "element", layer.name);

    if (layer.type == "marker") {
      layers.push(
        <Mapbox.ShapeSource key={layer.name} id={layer.name} shape={featuresToRender} images={{ assets: ["marker"] }}>
          <Mapbox.SymbolLayer id={layer.name} style={[styles[layer.name]]} maxZoomLevel={layer.maxZoom} minZoomLevel={layer.minZoom} />
        </Mapbox.ShapeSource>
      );
    } else if (layer.type == "ligne") {
      layers.push(
        <Mapbox.ShapeSource key={layer.name} id={layer.name} shape={featuresToRender}>
          <Mapbox.LineLayer id={layer.name} style={styles[layer.name]} />
        </Mapbox.ShapeSource>
      );
    } else if (layer.type == "secteur") {
      layers.push(
        <Mapbox.ShapeSource key={layer.name} id={layer.name} shape={featuresToRender}>
          <Mapbox.FillLayer id={layer.name} style={styles[layer.name]} />
        </Mapbox.ShapeSource>
      );
    }
  });

  return layers;
}
