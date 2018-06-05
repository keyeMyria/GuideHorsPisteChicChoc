import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content, List, ListItem, Text } from "native-base";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";

import * as Progress from "react-native-progress";

import Mapbox from "@mapbox/react-native-mapbox-gl";
import { MAPBOX_MAP_STYLE } from "../utils/conf";

import geoJsonData from "../assets/all.json";

import { getSourceData } from "../lib/geojsonManager";

import geojsonExtent from "@mapbox/geojson-extent";

export default class CarteHorsConnection extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.featuresToBounds = getSourceData(geoJsonData, "element", "boundingbox");
  }

  render() {
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
            {this.featuresToBounds.features.map((feature, index) => {
              return <DownloadItem key={index} feature={feature} />;
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

class DownloadItem extends React.Component {
  static propTypes = {
    feature: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.onDownloadProgress = this.onDownloadProgress.bind(this);

    let minZoom = 12;
    let maxZoom = 15;

    if (this.props.feature.properties.zoom === "gaspesie") {
      minZoom = 7;
      maxZoom = 8;
    } else if (this.props.feature.properties.zoom === "zone") {
      minZoom = 10;
      maxZoom = 11;
    } else if (this.props.feature.properties.zoom === "secteur") {
      minZoom = 12;
      maxZoom = 15;
    }

    this.state = {
      offlineRegion: undefined,
      offlineRegionStatus: undefined,
      status: undefined,
      offlinePack: undefined,
      error: undefined
    };

    this.bounds = geojsonExtent(this.props.feature);
    this.options = {
      name: this.props.feature.properties.groupe,
      styleURL: MAPBOX_MAP_STYLE,
      bounds: [[this.bounds[0], this.bounds[1]], [this.bounds[2], this.bounds[3]]],
      minZoom: minZoom,
      maxZoom: maxZoom
    };
  }

  async componentDidMount() {
    const groupe = this.props.feature.properties.groupe;
    const pack = await Mapbox.offlineManager.getPack(groupe);

    console.log("componentDidMount ", groupe);

    this.setState({
      groupe: groupe,
      pack: pack
    });

    await Mapbox.offlineManager.subscribe(groupe, this.onDownloadProgress, this.onError);

    console.log("componentDidMount: ", this.state);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: ", this.props.feature.properties.name);
    if (this.props.feature.offlineRegion) this.props.feature.offlineRegion.pause();
    Mapbox.offlineManager.unsubscribe(this.props.feature.properties.groupe);
  }

  onDownloadProgress(offlineRegion, offlineRegionStatus) {
    this.setState({
      offlineRegion: offlineRegion,
      offlineRegionStatus: offlineRegionStatus,
      status: offlineRegion.status()
    });

    console.log(this.state);
  }

  onError(offlineRegion, message) {
    this.setState({ error: message });
    console.log(this.state);
  }

  deletePack() {
    Alert.alert(
      "Attention",
      "Etes-vous certain de vouloir effacer les cartes hors ligne pour " + this.props.feature.properties.name + "?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            Mapbox.offlineManager.deletePack(this.props.feature.properties.groupe);
            this.setState({
              offlineRegion: undefined,
              offlineRegionStatus: undefined,
              status: undefined,
              offlinePack: undefined,
              error: undefined
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    if (this.state.error) {
      return (
        <InactiveDownload
          onPress={() => this.deletePack()}
          icon={"check"}
          color={"green"}
          title={this.props.feature.properties.name}
          note={"Erreur pendant le téléchargement: " + this.state.error}
        />
      );
    } else if (this.state.offlineRegionStatus) {
      if (this.state.offlineRegionStatus.state == Mapbox.OfflinePackDownloadState.Active) {
        return (
          <ActiveDownload
            onPress={() => this.state.offlineRegion.pause()}
            percentage={this.state.offlineRegionStatus.percentage / 100}
            title={this.props.feature.properties.name}
            note={"Téléchargement..."}
          />
        );
      } else if (this.state.offlineRegionStatus.state == Mapbox.OfflinePackDownloadState.Complete) {
        return (
          <InactiveDownload
            onPress={() => this.deletePack()}
            icon={"check"}
            color={"green"}
            title={this.props.feature.properties.name}
            note={"Terminé"}
          />
        );
      } else {
        return (
          <InactiveDownload
            onPress={() => this.state.offlineRegion.resume()}
            icon={"controller-play"}
            color={"black"}
            title={this.props.feature.properties.name}
            note={"Téléchargement en attente (" + Number(this.state.offlineRegionStatus.percentage).toFixed(1) + "%)"}
          />
        );
      }
    } else {
      return (
        <InactiveDownload
          onPress={() => Mapbox.offlineManager.createPack(this.options, this.onDownloadProgress, this.onError)}
          icon={"download"}
          color={"blue"}
          title={this.props.feature.properties.name}
          note={""}
        />
      );
    }
  }
}

const ActiveDownload = ({ percentage, onPress, title, note }) => (
  <ListItem onPress={() => onPress()}>
    <Progress.Pie progress={percentage} size={35} showsText={true} />
    <Body>
      <Text>{title}</Text>
      <Text note>{note}</Text>
    </Body>
  </ListItem>
);

const InactiveDownload = ({ icon, color, onPress, title, note }) => (
  <ListItem onPress={() => onPress()}>
    <Icon name={icon} size={35} style={{ color: `${color}` }} />
    <Body>
      <Text>{title}</Text>
      <Text note>{note}</Text>
    </Body>
  </ListItem>
);
