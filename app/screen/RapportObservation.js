import React from "react";
import {
  Container,
  Header,
  Title,
  //Subtitle,
  Left,
  // Right,
  Button,
  Body,
  Content,
  //Text,
  Fab
} from "native-base";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Entypo";
import RapportList from "../components/RapportList";

export default class RapportObservation extends React.Component {
  //static navigationOptions = {
  //    header: null,
  //    drawerLabel: 'Rapport d\'observation',
  //    drawerIcon: () => ( <Icon name="megaphone" size={20}/> )
  //}
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Rapport d&#39;observation</Title>
          </Body>
        </Header>
        <Content padder>
          <RapportList />
        </Content>
        <Fab
          direction="up"
          containerStyle={{}}
          //style={{ backgroundColor: '#5067FF' }}
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
