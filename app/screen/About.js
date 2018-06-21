import React from "react";
import { Container, Body, Content, Text, Card, CardItem } from "native-base";
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
                <Text>À propose de l&#39;application</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
