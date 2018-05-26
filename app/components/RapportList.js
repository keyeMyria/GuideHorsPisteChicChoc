import React from "react";
import PropTypes from "prop-types";
import { Body, Card, CardItem } from "native-base";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import FormData from "../assets/AddRapportFormData.json";

class RapportList extends React.Component {
  render() {
    return (
      <View>
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
                          {
                            FormData[NomDeLaSection].option_description[
                              parseInt(rapport[NomDeLaSection] - 1)
                            ][0]
                          }
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
              <Text>SYNCHRONISÉ</Text>
            </CardItem>
          </Card>
        ))}
      </View>
    );
  }
}

RapportList.propTypes = {
  rapports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      datetime: PropTypes.string.isRequired,
      taille_avalanche: PropTypes.number.isRequired,
      declenchement: PropTypes.number.isRequired,
      type_avalanche: PropTypes.number.isRequired,
      plan_glissement: PropTypes.number.isRequired,
      emplacement: PropTypes.string.isRequired,
      info_complementaires: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = state => ({
  rapports: state.rapports
});

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(RapportList);
