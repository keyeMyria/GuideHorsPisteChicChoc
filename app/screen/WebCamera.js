import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Icon from "react-native-vector-icons/Entypo";

export default class WebCamera extends React.Component {

    //static navigationOptions = {
    //    drawerLabel: 'Web caméra',
    //    drawerIcon: () => ( <Icon name="camera" size={20}/> )
    //  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" size={30}/>
            </Button>
          </Left>
          <Body>
            <Title>Web caméra</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Web caméra</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}