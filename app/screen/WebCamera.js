import React from "react";
import { Container, Body, Content, Text, Card, CardItem } from "native-base";
import PropTypes from "prop-types";
import HeaderBar from "../components/HeaderBar";

export default class WebCamera extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <HeaderBar openDrawer={() => this.props.navigation.openDrawer()}>
          Web caméra
        </HeaderBar>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Web caméra</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
