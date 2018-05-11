import React from "react";
import { AppRegistry, Image, Dimensions, ScrollView, View, StyleSheet, TouchableOpacity, ImageBackground   } from "react-native";
import { DrawerItems, StackActions, NavigationActions, SafeAreaView } from "react-navigation";

export default class SideBar extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <ImageBackground 
            source={{uri: 'ski'}}
            style={{
              flex: 0.3, 
              alignContent: 'center',
              //width: null,
              //resizeMode: 'contain',
              //height: 200
              //alignSelf: "stretch", aspectRatio: 800/443, resizeMode: 'stretch'
            }}
          >
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
          <Image
              style={{ 
                height: 92, 
                width: 205, 
                alignSelf: 'center',
                alignContent: 'center',
              }}

              source={require('../assets/aq.png')}
              //source={{uri: 'aq.png'}}
          />
          </View>
          </ImageBackground >

          <ScrollView>
              <DrawerItems {...this.props} />
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    backgroundColor: "rgba(12, 12, 12, 0.2)",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20
  }
});
