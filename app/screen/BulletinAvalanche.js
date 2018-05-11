import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Icon from "react-native-vector-icons/Entypo";

export default class BulletinAvalanche extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Bulletin d\'avalanche',
        drawerIcon: () => ( <Icon name="news" size={20}/> )
      }

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
            <Title>Bulletin d\'avalanche</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Bulletin d\'avalanche</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}