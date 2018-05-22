import React from "react";
import PropTypes from "prop-types";
import { Body, Card, CardItem, Container, Content } from "native-base";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import FormData from "../assets/AddRapportFormData.json";

//import Icon from "react-native-vector-icons/Entypo";

class RapportList extends React.Component {

  render() {
    return (
      <Container>
        <Content padder>
          {this.props.rapports.map(rapport => (
            <Card key={rapport.id}>
              <CardItem header bordered>
                <Text>Rapport du {rapport.datetime}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Emplacement: </Text>
                    <Text>{rapport.emplacement}</Text>
                  </View>

                  {Object.keys(FormData).map(
                    (NomDeLaSection, IndexDeLaSection) => (
                      <View key={IndexDeLaSection}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {FormData[NomDeLaSection].titre}{" "}
                          </Text>
                          <Text numberOfLines={2}>
                            {FormData[NomDeLaSection].option_description[1][0]}
                          </Text>
                        </View>
                      </View>
                    )
                  )}

                  <Text style={{ fontWeight: "bold" }}>
                    Informations complémentaires:{" "}
                  </Text>
                  <Text>{rapport.info_complementaires}</Text>
                </Body>
              </CardItem>

              <CardItem footer bordered>
                <Text>GeekyAnts</Text>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}

//<ListItem key={rapport.datetime}>
//  <Thumbnail square size={80} source={{ uri: "aq" }} />
//  <Body>
//    <Text>
//      {rapport.emplacement} - {rapport.datetime}
//    </Text>
//    <Text note>{rapport.infos_complementaires}</Text>
//  </Body>
//  <Right>
//    <Spinner />
//  </Right>
//</ListItem>;

//<Icon name="check" size={20}/>

//RapportList.propTypes = {
//  rapports: PropTypes.arrayOf(
//    PropTypes.shape({
//      id: PropTypes.number.isRequired,
//      timestamp: PropTypes.string.isRequired,
//      lieu: PropTypes.string.isRequired,
//      description: PropTypes.string.isRequired
//    }).isRequired
//  ).isRequired
//};

const mapStateToProps = state => ({
  rapports: state.rapports
});

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(RapportList);
