import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Icon from "react-native-vector-icons/Entypo";

export default class BulletinAvalanche extends React.Component {

    //static navigationOptions = {
    //    drawerLabel: 'À propos',
    //    drawerIcon: () => ( <Icon name="thumbs-up" size={20}/> )
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
            <Title>À propos</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>À propose de l'application</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}