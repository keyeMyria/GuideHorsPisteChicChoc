import React from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Mapbox from "@mapbox/react-native-mapbox-gl";

import { startMapDownload, deleteMap } from "../../lib/offlineManager";

import ActiveDownload from "./ActiveDownload";
import InactiveDownload from "./InactiveDownload";

class DownloadItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    //console.log("componentWillUnmount: ", this.props.feature.properties.name);
    //if (this.props.feature.offlineRegion) this.props.feature.offlineRegion.pause();
    //Mapbox.offlineManager.unsubscribe(this.props.feature.properties.groupe);
  }

  deleteMap() {
    Alert.alert(
      "Attention",
      "Etes-vous certain de vouloir effacer les cartes hors ligne pour " + this.props.item.name + "?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            deleteMap(this.props.item, this.props.dispatch);
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    if (this.props.item.error) {
      console.log("error", this.props.item);
      return (
        <InactiveDownload
          onPress={() => this.deleteMap()}
          icon={"circle-with-cross"}
          color={"red"}
          title={this.props.item.name}
          note={"Erreur pendant le téléchargement: " + this.props.item.error.message}
        />
      );
    } else if (this.props.item.offlineRegionStatus) {
      if (this.props.item.offlineRegionStatus.state == Mapbox.OfflinePackDownloadState.Active) {
        return (
          <ActiveDownload
            onPress={() => this.props.item.offlineRegion.pause()}
            percentage={this.props.item.offlineRegionStatus.percentage / 100}
            title={this.props.item.name}
            note={"Téléchargement..."}
          />
          //<InactiveDownload
          //onPress={() => this.props.item.offlineRegion.pause()}
          //icon={"circle-with-cross"}
          //color={"green"}
          //title={this.props.item.name}
          //note={"download: " + this.props.item.offlineRegionStatus.percentage / 100}
          ///>

        );
      } else if (this.props.item.offlineRegionStatus.state == Mapbox.OfflinePackDownloadState.Complete) {
        return <InactiveDownload onPress={() => this.deleteMap()} icon={"check"} color={"green"} title={this.props.item.name} note={"Terminé"} />;
      } else {
        return (
          <InactiveDownload
            onPress={() => this.props.item.offlineRegion.resume()}
            icon={"controller-play"}
            color={"black"}
            title={this.props.item.name}
            note={"Téléchargement en attente (" + Number(this.props.item.offlineRegionStatus.percentage).toFixed(1) + "%)"}
          />
        );
      }
    } else {
      return (
        <InactiveDownload
          onPress={() => startMapDownload(this.props.item, this.props.dispatch)}
          icon={"download"}
          color={"blue"}
          title={this.props.item.name}
          note={""}
        />
      );
    }
  }
}

export default connect()(DownloadItem);
