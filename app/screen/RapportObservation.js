import React from "react";
import { Container, Content, Fab } from "native-base";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Entypo";
import RapportList from "../components/RapportList";
import HeaderBar from "../components/HeaderBar";

export default class RapportObservation extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <HeaderBar openDrawer={() => this.props.navigation.openDrawer()}>
          Rapport d&#39;observation
        </HeaderBar>
        <Content padder>
          <RapportList />
        </Content>
        <Fab
          direction="up"
          containerStyle={{}}
          // style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => {
            this.props.navigation.navigate("AddRaport");
          }}
        >
          <Icon name="plus" />
        </Fab>
      </Container>
    );
  }
}
