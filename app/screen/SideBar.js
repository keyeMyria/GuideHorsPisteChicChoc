import React from "react";
import { AppRegistry, Image, Dimensions, ScrollView, View, StyleSheet, TouchableOpacity  } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { DrawerItems, StackActions, NavigationActions, SafeAreaView } from "react-navigation";
import DrawerNavigatorItems from '../components/DrawerNavigatorItems'

export default class SideBar extends React.Component {

  _navigate(route) {

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      //routeName: 'Map',
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

    console.log('SideBar', this.props);

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

              source={require('../assets/aq.png')}
              //source={{uri: 'aq.png'}}
          />

            <ScrollView>
              
                <DrawerItems {...this.props} />
             
            </ScrollView>
{/* 
<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
 </SafeAreaView>
*/}
          <ScrollView>



            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => this._navigate("Map")}
              >
              <Text style={styles.menuItemText}>Cartes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => this._navigate("Meteo")}
              >
              <Text style={styles.menuItemText}>Meteo</Text>
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