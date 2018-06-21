import React from "react";

import Icon from "react-native-vector-icons/Entypo";

import SideBar from "./screen/SideBar";
import MapScreen from "./screen/MapScreen";
import BulletinAvalanche from "./screen/BulletinAvalanche";
import PrevisionMeteo from "./screen/PrevisionMeteo";
import WebCamera from "./screen/WebCamera";
import RapportObservation from "./screen/RapportObservation";
import About from "./screen/About";
import AddRaport from "./screen/AddRaport";
import CarteHorsConnection from "./screen/CarteHorsConnection/CarteHorsConnection";

import { createDrawerNavigator, createStackNavigator } from "react-navigation";

const stackRapport = createStackNavigator(
  {
    RapportObservation: { screen: RapportObservation },
    AddRaport: { screen: AddRaport }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const Routes = createDrawerNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        drawerLabel: "Cartes des sentiers",
        drawerIcon: () => <Icon name="map" size={20} />
      }
    },
    BulletinAvalanche: {
      screen: BulletinAvalanche,
      navigationOptions: {
        drawerLabel: "Bulletin d'avalanche",
        drawerIcon: () => <Icon name="news" size={20} />
      }
    },
    PrevisionMeteo: {
      screen: PrevisionMeteo,
      navigationOptions: {
        drawerLabel: "Prévisions météo",
        drawerIcon: () => <Icon name="icloud" size={20} />
      }
    },
    WebCamera: {
      screen: WebCamera,
      navigationOptions: {
        drawerLabel: "Web caméra",
        drawerIcon: () => <Icon name="camera" size={20} />
      }
    },
    RapportObservation: {
      screen: stackRapport,
      navigationOptions: {
        drawerLabel: "Rapport d'observation",
        drawerIcon: () => <Icon name="megaphone" size={20} />
      }
    },
    CarteHorsConnection: {
      screen: CarteHorsConnection,
      navigationOptions: {
        drawerLabel: "Cartes Hors Connection",
        drawerIcon: () => <Icon name="download" size={20} />
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        drawerLabel: "À propos",
        drawerIcon: () => <Icon name="thumbs-up" size={20} />
      }
    }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default Routes;
