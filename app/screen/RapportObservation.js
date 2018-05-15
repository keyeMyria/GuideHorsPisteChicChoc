import React from "react";
import { Container, Header, Title, Subtitle, Left, Right, Button, Body, Content,Text, Fab } from "native-base";
import {
    StyleSheet,
    View,
    ScrollView
  } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import RapportList from '../components/RapportList'

export default class RapportObservation extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Rapport d\'observation',
        drawerIcon: () => ( <Icon name="megaphone" size={20}/> )
      }
//          
          //
            
          //
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu"  size={30}/>
                    
            </Button>
            </Left>
            <Body>
            <Title>Rapport d'observation</Title>
            </Body>
        </Header>
        <Content padder>
        <RapportList />
        <View style={{ flex: 1 }}>
          

        </View>
        </Content>
        <Fab
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            >
            <Icon name="plus" />
          </Fab>
      </Container>
    );
  }
}