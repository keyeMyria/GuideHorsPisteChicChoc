import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
  containter: {
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    left: 48,
    right: 48,
    paddingVertical: 16,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

class Bubble extends React.PureComponent {
  render() {
    let innerChildView = this.props.children;

    if (this.props.onPress) {
      innerChildView = (
        <TouchableOpacity onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.containter, this.props.style]}>
        {innerChildView}
      </View>
    );
  }
}

export default Bubble;
