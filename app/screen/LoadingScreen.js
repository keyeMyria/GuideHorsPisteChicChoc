
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

export default class LoadingScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                animating
                color="#fff"
                size="large"
                style={styles.activityIndicator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },

});

