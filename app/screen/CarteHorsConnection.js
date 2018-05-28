import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content, List, ListItem, Text } from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";

import Mapbox from "@mapbox/react-native-mapbox-gl";
import { MAPBOX_MAP_STYLE } from "../utils/conf";

import geoJsonData from "../assets/all.json";

import { getSourceData } from "../lib/geojson";

import geojsonExtent from "@mapbox/geojson-extent";

//var downloadItems = [];
//var featuresToBounds = {};

export default class CarteHorsConnection extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.toggleDownload = this.toggleDownload.bind(this);
    this.onDownloadProgress = this.onDownloadProgress.bind(this);

    this.state = {
      downloadItems: {}
    };
  }

  async componentDidMount() {
    const offlinePacks = await Mapbox.offlineManager.getPacks();
    await offlinePacks.map((pack, index) => {
      console.log(index, pack);

      Mapbox.offlineManager.subscribe(pack._metadata.name, this.onDownloadProgress, (offlineRegion, offlineRegionStatus) => {
        console.log("a", offlineRegion);
        console.log("b", offlineRegionStatus);
        console.log("c", offlineRegion.status());
      });

      //console.log(pack._metadata.name);
      //const singlepack = Mapbox.offlineManager.getPack(pack._metadata.name);
      //console.log(singlepack.status());
      //Mapbox.offlineManager.deletePack(pack._metadata.name);
    });

    const featuresToBounds = getSourceData(geoJsonData, "element", "boundingbox");

    let downloadItems = { ...this.state.downloadItems };

    featuresToBounds.features.map(feature => {
      const offlinePack = Mapbox.offlineManager.getPack(feature.properties.groupe);

      const bounds = geojsonExtent(feature);

      downloadItems[feature.properties.groupe] = {
        properties: feature.properties,
        bounds: bounds,
        offlinePack: offlinePack,
        offlineRegion: undefined,
        offlineRegionStatus: undefined
      };
    });

    this.setState({ downloadItems });
  }

  componentWillUnmount() {
    console.log("Carte componentWillUnmount");

    // avoid setState warnings if we back out before we finishing downloading
    //Mapbox.offlineManager.deletePack(this.state.name);
    //Mapbox.offlineManager.unsubscribe("test");
  }

  onDownloadProgress(offlineRegion, offlineRegionStatus) {
    let downloadItems = { ...this.state.downloadItems };

    downloadItems[offlineRegion.name] = {
      ...downloadItems[offlineRegion.name],
      offlineRegion: offlineRegion,
      offlineRegionStatus: offlineRegionStatus,
      status: offlineRegion.status()
    };
    //console.log(downloadItems[offlineRegion.name]);
    this.setState({ downloadItems });
  }

  toggleDownload(name, bounds) {
    const options = {
      name: name,
      styleURL: MAPBOX_MAP_STYLE,
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 12,
      maxZoom: 15
    };

    Mapbox.offlineManager.createPack(options, this.onDownloadProgress);
  }

  render() {
    //console.log(this.state.downloadItems);

    const downloadItems = this.state.downloadItems;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Carte Hors Connection</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List>
            {Object.values(downloadItems).map((feature, index) => {
              console.log(feature);
              return (
                <DownloadItem key={index} feature={feature} onPress={feature => this.toggleDownload(feature.properties.groupe, feature.bounds)} />
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const DownloadItem = ({ feature, onPress }) => {
  let statusText = "";
  let icon = "";
  let color = "blue";

  if (feature.offlineRegionStatus) {
    if (feature.offlineRegionStatus.state == Mapbox.OfflinePackDownloadState.Active) {
      statusText = "Téléchargement: " + Number(feature.offlineRegionStatus.percentage).toFixed(1) + "%";
      icon = "controller-paus";
      color = "yellow";
    } else if (feature.offlineRegionStatus.state == Mapbox.OfflinePackDownloadState.Complete) {
      statusText = "Terminé";
      icon = "check";
      color = "green";
    } else {
      statusText = "Pas encore téléchargé, mais existe";
      icon = "download";
    }
  } else {
    statusText = "Pas encore téléchargé";
    icon = "download";
  }

  return (
    <ListItem onPress={() => onPress(feature)}>
      <Icon name={icon} size={35} style={{ color: "blue" }} />
      <Body>
        <Text>{feature.properties.name}</Text>
        <Text note>{statusText}</Text>
      </Body>
    </ListItem>
  );
};

DownloadItem.propTypes = {
  feature: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

//<Content padder>
//<List>
//  {this.state.map((feature, index) => (
//    <DownloadItem key={index} name={feature.properties.groupe} />
//  ))}
//</List>
//</Content>
