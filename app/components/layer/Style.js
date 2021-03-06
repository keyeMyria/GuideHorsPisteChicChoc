import Mapbox from "@mapbox/react-native-mapbox-gl";

export const styles = Mapbox.StyleSheet.create({
  accesstrack: {
    lineColor: "red",
    lineWidth: 1.5,
    lineBlur: 0.5,
    lineOpacity: Mapbox.StyleSheet.camera(
      {
        10.5: 0.0,
        11.5: 0.45
      },
      Mapbox.InterpolationMode.Exponential
    )
  },

  skintrack: {
    lineColor: "red",
    lineWidth: 2.5,
    lineBlur: 0.5,
    lineDasharray: [0.5, 1.0],
    lineOpacity: Mapbox.StyleSheet.camera(
      {
        11.5: 0.0,
        12: 0.64
      },
      Mapbox.InterpolationMode.Exponential
    )
  },

  ligne: {
    lineColor: "yellow",
    lineWidth: 1.5,
    lineOpacity: Mapbox.StyleSheet.camera(
      {
        10.5: 0.0,
        12: 0.8
      },
      Mapbox.InterpolationMode.Exponential
    )
  },

  secteursimple: {
    fillColor: "green",
    fillAntialias: true,
    fillOpacity: Mapbox.StyleSheet.camera(
      {
        9: 0.0,
        10.5: 0.15
      },
      Mapbox.InterpolationMode.Exponential
    )
  },

  secteurexigeant: {
    fillColor: "blue",
    fillAntialias: true,
    fillOpacity: Mapbox.StyleSheet.camera(
      {
        9: 0.0,
        10.5: 0.12
      },
      Mapbox.InterpolationMode.Exponential
    )
  },

  secteurcomplexe: {
    fillColor: "gray",
    fillAntialias: true,
    fillOpacity: Mapbox.StyleSheet.camera(
      {
        9: 0.0,
        10.5: 0.3
      },
      Mapbox.InterpolationMode.Exponential
    )
  },

  markerparking: {
    iconImage: "car-15",
    iconAllowOverlap: true,
    iconSize: 1.4,
    iconOpacity: Mapbox.StyleSheet.camera(
      {
        11: 0.0,
        12: 1
      },
      Mapbox.InterpolationMode.Exponential
    ),
    textOpacity: Mapbox.StyleSheet.camera(
      {
        11: 0.0,
        12: 0.5
      },
      Mapbox.InterpolationMode.Exponential
    ),
    textSize: 12,
    textField: "{name}",
    textColor: "black",
    //textOpacity: 0.5,
    textAnchor: "left",
    textIgnorePlacement: true,
    iconIgnorePlacement: true,
    textOffset: [1.0, 0],
    textMaxWidth: 6,
    textJustify: "left",
    textMaxAngle: 25
  },

  markerrefuge: {
    //iconImage: "house",
    iconImage: require("../../assets/house.png"),
    iconAllowOverlap: true,
    iconSize: 0.3,
    iconOpacity: Mapbox.StyleSheet.camera(
      {
        11: 0.0,
        12: 1
      },
      Mapbox.InterpolationMode.Exponential
    ),
    textOpacity: Mapbox.StyleSheet.camera(
      {
        11: 0.0,
        12: 0.5
      },
      Mapbox.InterpolationMode.Exponential
    ),
    textSize: 12,
    textField: "{name}",
    textColor: "black",
    //textOpacity: 0.5,
    textAnchor: "left",
    textIgnorePlacement: true,
    iconIgnorePlacement: true,
    textOffset: [1.0, 0],
    textMaxWidth: 6,
    textJustify: "left",
    textMaxAngle: 25
  },

  markersecteur: {
    //iconImage: "marker",
    iconImage: require("../../assets/marker.png"),
    iconAllowOverlap: true,
    iconSize: 0.5,
    textSize: 12,
    textField: "{name}",
    textColor: "black",
    textOpacity: 0.8,
    textAnchor: "left",
    iconIgnorePlacement: true,
    textIgnorePlacement: true,
    textOffset: [1.0, 0],
    textMaxWidth: 6,
    textJustify: "left",
    textMaxAngle: 25
  },

  markermontagne: {
    //iconImage: "marker",
    iconImage: require("../../assets/marker.png"),
    iconAllowOverlap: true,
    iconSize: 0.5,
    textSize: 12,
    textField: "{name}",
    textColor: "black",
    textOpacity: 0.8,
    textAnchor: "left",
    iconIgnorePlacement: true,
    textIgnorePlacement: true,
    textOffset: [1.0, 0],
    textMaxWidth: 6,
    textJustify: "left",
    textMaxAngle: 25
  },

  markerzone: {
    //iconImage: "marker",
    iconImage: require("../../assets/marker.png"),
    iconAllowOverlap: true,
    iconSize: 0.5,
    textSize: 12,
    textField: "{name}",
    textColor: "black",
    textOpacity: 0.8,
    textAnchor: "left",
    iconIgnorePlacement: true,
    textIgnorePlacement: true,
    textOffset: [1.0, 0],
    textMaxWidth: 6,
    textJustify: "left",
    textMaxAngle: 25
  }
});
