import React from "react";
import { Body, ListItem, Text } from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";

export default class InactiveDownload extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired
  };
  render() {
    return (
      <ListItem onPress={() => this.props.onPress()}>
        <Icon name={this.props.icon} size={35} style={{ color: `${this.props.color}` }} />
        <Body>
          <Text>{this.props.title}</Text>
          <Text note>{this.props.note}</Text>
        </Body>
      </ListItem>
    );
  }
}
