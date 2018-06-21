import React from "react";
import { Container, Content } from "native-base";
import { WebView, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import HeaderBar from "../components/HeaderBar";

// const deviceHeight = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;

export default class BulletinAvalanche extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <HeaderBar openDrawer={() => this.props.navigation.openDrawer()}>
          Bulletin d avalanche
        </HeaderBar>
        <Content padder>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <WebView
              style={styles.webview}
              source={{
                uri:
                  "https://avalanchequebec.ca/conditions-chic-chocs#rapports-neige"
              }}
              onError={() => console.log("onError")}
              onLoad={() => console.log("onLoad")}
              renderError={err => console.log(err)}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  }
});
