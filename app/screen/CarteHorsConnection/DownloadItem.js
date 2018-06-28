import React from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  startMapDownload,
  deleteMap,
  resumePack,
  pausePack,
  pack_status
} from "../../actions/offline";

import ActiveDownload from "./ActiveDownload";
import InactiveDownload from "./InactiveDownload";

class DownloadItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log("componentDidMount: ", this.props.item);
  }

  deleteMap() {
    Alert.alert(
      "Attention",
      "Etes-vous certain de vouloir effacer les cartes hors ligne pour " +
        this.props.item.name +
        "?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.dispatch(deleteMap(this.props.item));
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    switch (this.props.item.pack_status) {
      case pack_status.RESUMING:
        return (
          <InactiveDownload
            onPress={() => {}}
            icon={"download"}
            color={"grey"}
            title={this.props.item.name}
            note={"Analyse de la carte..."}
          />
        );

      case pack_status.DOWNLOAD_WILL_START:
        return (
          <InactiveDownload
            onPress={() => {}}
            icon={"download"}
            color={"grey"}
            title={this.props.item.name}
            note={"Téléchargement commencé..."}
          />
        );

      case pack_status.NOT_DOWNLOADED:
        return (
          <InactiveDownload
            onPress={() => this.props.dispatch(startMapDownload(this.props.item))}
            icon={"download"}
            color={"blue"}
            title={this.props.item.name}
            note={""}
          />
        );

      case pack_status.DOWNLOADING:
        return (
          <ActiveDownload
            onPress={() => this.props.dispatch(pausePack(this.props.item))}
            percentage={this.props.item.offlineRegionStatus.percentage / 100}
            title={this.props.item.name}
            note={"Téléchargement..."}
          />
        );

      case pack_status.DOWNLOADED:
        return (
          <InactiveDownload
            onPress={() => this.deleteMap()}
            icon={"check"}
            color={"green"}
            title={this.props.item.name}
            note={"Terminé"}
          />
        );

      case pack_status.PAUSED:
        return (
          <InactiveDownload
            onPress={() => this.props.dispatch(resumePack(this.props.item))}
            icon={"controller-play"}
            color={"black"}
            title={this.props.item.name}
            note={
              "Téléchargement en attente (" +
              Number(this.props.item.offlineRegionStatus.percentage).toFixed(1) +
              "%)"
            }
          />
        );

      case pack_status.ERROR:
        return (
          <InactiveDownload
            onPress={() => this.deleteMap()}
            icon={"circle-with-cross"}
            color={"red"}
            title={this.props.item.name}
            note={"Erreur pendant le téléchargement: " + this.props.item.error.message}
          />
        );
    }
  }
}

export default connect()(DownloadItem);
