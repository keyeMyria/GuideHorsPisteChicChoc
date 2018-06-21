import React from "react";
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import HeaderBar from "../components/HeaderBar";

export default class BulletinAvalanche extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <HeaderBar openDrawer={() => this.props.navigation.openDrawer()}>
        À propos
        </HeaderBar>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>À propose de l'application</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
