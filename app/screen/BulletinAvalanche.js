import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import { WebView, View, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class BulletinAvalanche extends React.Component {

  constructor(props) {
    super(props);

  }


    static navigationOptions = {
        drawerLabel: 'Bulletin d\'avalanche',
        drawerIcon: () => ( <Icon name="news" size={20}/> ),
      }

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
            <Title>Bulletin d'avalanche</Title>
          </Body>
          
        </Header>
        <Content padder>
        <View style={{flex: 1, flexDirection:'column'}}>

                <WebView  style={styles.webview}
                  source={{uri: 'https://avalanchequebec.ca/conditions-chic-chocs#rapports-neige'}}
                  onError={() => console.log('onError')}
                  onLoad={() => console.log('onLoad')}
                  renderError = {(err)=> console.log(err)}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  />
        </View>
        </Content>
      </Container>



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
  webview: {
    width: deviceWidth,
    height: deviceHeight
}

});
