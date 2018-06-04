import React from "react";
import { Image, ScrollView, View, ImageBackground } from "react-native";
import { DrawerItems } from "react-navigation";

export default class SideBar extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: "ski" }}
          style={{
            flex: 0.3,
            alignContent: "center"
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Image
              style={{
                height: 92,
                width: 205,
                alignSelf: "center",
                alignContent: "center"
              }}
              //source={require("../assets/aq.png")}
              source={{ uri: "aq" }}
            />
          </View>
        </ImageBackground>

        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </View>
    );
  }
}
