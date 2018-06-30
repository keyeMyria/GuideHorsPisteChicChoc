import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Container, Body, Content, Card, CardItem } from "native-base";
import PropTypes from "prop-types";
import HeaderBar from "../components/HeaderBar";

export default class WebCamera extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <HeaderBar openDrawer={() => this.props.navigation.openDrawer()}>Web caméra</HeaderBar>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <FullWidthImage
                  source={{
                    uri: "https://rockandice.com/wp-content/uploads/2017/09/black-logo.png?x58391"
                  }}
                />
                <View style={styles.imageContainer}>
                  <Image
                    style={{ height: 200, width: null, flex: 1 }}
                    source={{
                      uri: "https://avalanchequebec.ca/wp-content/uploads/webcam/final.jpg"
                    }}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

//export default
class FullWidthImage extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio
      });
    } else {
      Image.getSize(this.props.source, (width, height) => {
        this.setState({
          width: containerWidth,
          height: (containerWidth * height) / width
        });
      });
    }
  }

  render() {
    console.log(this.state.width, this.state.height);
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "stretch"
  },
  image: {
    flex: 1
  }
});
