// Topbar.js
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Header, Left, Button, Icon, Body, Title } from "native-base";

class HeaderBar extends Component {
  static propTypes = {
    openDrawer: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  };

  render() {
    console.log(this.props);

    return (
      <Header>
        <Left style={{ flex: 1, paddingLeft: 10 }}>
          <Button transparent onPress={() => this.props.openDrawer()}>
            <Icon name="menu" size={30} />
          </Button>
        </Left>
        <Body
          style={{ flex: 10, justifyContent: "center", alignItems: "center" }}
        >
          <Title>{this.props.children}</Title>
        </Body>
      </Header>
    );
  }
}

export default HeaderBar;
// onPress={() => this.props.openDrawer()}
