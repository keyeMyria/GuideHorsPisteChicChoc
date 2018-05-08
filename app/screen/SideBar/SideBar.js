import React from "react";
import { AppRegistry, Image, Dimensions, ScrollView, View, StyleSheet, TouchableOpacity  } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { DrawerItems, StackActions, NavigationActions } from "react-navigation";

export default class SideBar extends React.Component {

  _navigate(route) {

    const navigateAction = NavigationActions.navigate({
      routeName: 'Map',
    
      params: {},
    
    });
    
    this.props.navigation.dispatch(navigateAction);

    //return this.props.navigation.dispatch(
    //  StackActions.reset({
    ///    index: 0,
    //    actions: [NavigationActions.navigate({ routeName: `${route}` })]
    //  })
    //);
  }

  constructor(props) {
    super(props);

    console.log('SideBar', Dimensions.get('window'));

  }

  render() {
    return (
      <View style={{flex: 1}}>
          <Image
            
            source={{uri: 'ski'}}//source={require('../../assets/ski.jpg')}

            style={{
              //flex: 0.3, 
              //width: null,
              //resizeMode: 'contain',
              //height: 200
              alignSelf: "stretch", aspectRatio: 666/500, resizeMode: 'stretch'
            }}
          />
          <Image
              style={{ 
                height: 92, 
                width: 205, 
                
                top : 20, 
                left : 20, 
                position : 'absolute' ,  }}

              source={require('../../assets/aq.png')}
              //source={{uri: 'aq.png'}}
          />

          <ScrollView>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              this._navigate("Map", { isStatusBarHidden: false })}
            >

            <Text style={styles.menuItemText}>Cartes</Text>
          </TouchableOpacity>
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

//<DrawerItems {...this.props} />