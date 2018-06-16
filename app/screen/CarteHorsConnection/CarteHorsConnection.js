import React from "react";
import { Container, Header, Title, Left, Button, Body, Content, List } from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DownloadItem from "./DownloadItem";

class CarteHorsConnection extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    offline_status: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    //this.items = Object.values(this.props.offline_status).sort(function(a, b) {
    //  if (a.name < b.name) return -1;
    //  if (a.name > b.name) return 1;
    //  return 0;
    //});
//
    //this.items.map(item => {
    //  console.log(item.name);
    //});

    console.log("CarteHorsConnection componentDidMount ", this.props);
  }

  componentDidMount() {
    console.log("offline_status", this.props.offline_status);
  }

  render() {
    //console.log("offline_status", this.props.offline_status);

    const items = Object.values(this.props.offline_status).sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    //this.items.map(item => {
    //  console.log(item.name);
    //});

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Carte Hors Connection</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            {items.map((item, index) => {
              return <DownloadItem key={index} item={item} />;
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  offline_status: state.offline_status
});

export default connect(mapStateToProps)(CarteHorsConnection);
