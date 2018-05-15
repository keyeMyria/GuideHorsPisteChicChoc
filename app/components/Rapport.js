import React from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    ActivityIndicator
  } from 'react-native';
  import Icon from "react-native-vector-icons/Entypo";
  import { Container, Header, Content, List, ListItem, Separator } from 'native-base';

class Rapport extends React.Component { 

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {

        return (

            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'ski' }} />
              <Body>
                <Text>Sankhadeep</Text>
                <Text note>Its time to build a difference . .</Text>
              </Body>
            </ListItem>


        )
    }
}


//<View style={styles.container}>
//<Icon name="pencil" size={40}/> 
//<View style={styles.list}>
//    <View style={styles.container}><Text>Lieu: </Text><Text>{this.props.lieu}</Text></View>
//    <View style={styles.container}><Text>Description: </Text><Text>{this.props.description}</Text></View>
//    <View style={styles.container}><Text>Date: </Text><Text>{this.props.timestamp}</Text></View>
//</View>
//</View>

//const Rapport = ({ rapport }) => ( 
//    <View style={styles.container}>
//        <Icon name="pencil" size={20}/> 
//        <Text>{rapport.description}</Text>
//    </View>
  //<li
  //  onClick={onClick}
  //  style={{
  //    textDecoration: completed ? 'line-through' : 'none'
  //  }}
  //>
  //  {text}
  //</li>
//)

//Rapport.propTypes = {
//  onClick: PropTypes.func.isRequired,
//  completed: PropTypes.bool.isRequired,
//  text: PropTypes.string.isRequired
//}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      flexDirection: 'row'
    },
    list: {
        flex: 1,
        padding: 10,
        flexDirection: 'column'
      },
  });

export default Rapport
