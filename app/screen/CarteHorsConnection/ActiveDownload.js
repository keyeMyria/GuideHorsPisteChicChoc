import React from "react";
import { Body, ListItem, Text } from "native-base";

import PropTypes from "prop-types";

//import * as Progress from "react-native-progress";
import ProgressPie from "react-native-progress/Pie";

export default class ActiveDownload extends React.Component {
  static propTypes = {
    percentage: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired
  };
  //const ActiveDownload = ({ percentage, onPress, title, note }) =>
  render() {
    return (
      <ListItem onPress={() => this.props.onPress()}>
        <ProgressPie progress={this.props.percentage} size={35} showsText={true} />
        <Body>
          <Text>{this.props.title}</Text>
          <Text note>{this.props.note}</Text>
        </Body>
      </ListItem>
    );
  }
}
