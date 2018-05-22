import React, { Component } from "react";
import { connect } from "react-redux";
import { addRapport } from "../actions";
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
  Content,
  Text,
  Item,
  Textarea,
  Input,
  Form,
  Radio,
  Grid,
  Col,
  H3,
  Row
} from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import DatePicker from "react-native-datepicker";
import PropTypes from "prop-types";

import moment from "moment";

import FormData from "../assets/AddRapportFormData.json";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

class BulletinAvalanche extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    var now = moment().format("YYYY-MM-DD HH:mm");

    this.state = {
      id: guid(),
      datetime: now,
      taille_avalanche: 1,
      declenchement: 1,
      type_avalanche: 1,
      plan_glissement: 1,
      emplacement: "",
      infos_complementaires: ""
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-left" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Ajouter un rapport</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item>
              <Grid style={{ marginBottom: 15 }}>
                <Row>
                  <View style={{ marginBottom: 15 }}>
                    <H3>Date de l&#39;évenement:</H3>
                  </View>
                </Row>
                <Row>
                  <DatePicker
                    style={{ flex: 1 }}
                    date={this.state.datetime}
                    mode="datetime"
                    //placeholder="Sélectionner la date"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="Confirmer"
                    cancelBtnText="Annuler"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
                    onDateChange={date => {
                      this.setState({
                        datetime: date
                      });
                      console.log("date", date);
                    }}
                  />
                </Row>
              </Grid>
            </Item>

            <Item>
              <Grid>
                <Row>
                  <View style={{ marginTop: 15 }}>
                    <H3>Emplacement:</H3>
                  </View>
                </Row>
                <Row>
                  <Input
                    placeholder="(nom de la montagne et du couloir)"
                    onChangeText={text => this.setState({ emplacement: text })}
                  />
                </Row>
              </Grid>
            </Item>

            {Object.keys(FormData).map((NomDeLaSection, IndexDeLaSection) => (
              <Item key={IndexDeLaSection}>
                <Grid>
                  <Row>
                    <View style={{ marginBottom: 15, marginTop: 15 }}>
                      <H3>{FormData[NomDeLaSection].titre}</H3>
                      <Text note>{FormData[NomDeLaSection].soustitre}</Text>
                    </View>
                  </Row>
                  {FormData[NomDeLaSection].option_description.map(
                    (radio_description, radio_index) => (
                      <Row key={radio_index}>
                        <RadioItem
                          index={radio_index + 1}
                          selected={
                            radio_index + 1 == this.state[NomDeLaSection]
                          }
                          onPress={selected =>
                            this.setState({ [NomDeLaSection]: selected })
                          }
                          title={radio_description[0]}
                          description={radio_description[1]}
                        />
                      </Row>
                    )
                  )}
                </Grid>
              </Item>
            ))}

            <Item>
              <Grid>
                <Row>
                  <View style={{ marginTop: 15 }}>
                    <H3>Informations complémentaires:</H3>
                  </View>
                </Row>
                <Row>
                  <Textarea
                    style={{ flex: 1 }}
                    rowSpan={5}
                    bordered
                    onChangeText={text =>
                      this.setState({ infos_complementaires: text })
                    }
                    placeholder="Veuillez indiquer si il y a eu des victimes, ainsi que vos coordonnées afin de vous contacter si nous avons besoins de plus d'informations."
                  />
                </Row>
              </Grid>
            </Item>

            <Button
              block
              success
              style={{ marginTop: 15 }}
              onPress={() => {
                this.props.dispatch(addRapport(this.state));
                this.props.navigation.goBack();
              }}
            >
              <Text>Envoyer</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const RadioItem = ({ index, title, description, onPress, selected }) => (
  <Grid style={{ marginBottom: 15 }}>
    <Col size={15}>
      <Radio
        style={{
          alignItems: "center"
        }}
        selected={selected}
        onPress={() => onPress(index)}
      />
    </Col>
    <Col size={85}>
      <Row>
        <Text>{title}</Text>
      </Row>
      <Row>
        <Text onPress={() => onPress(index)} style={{ fontSize: 12 }}>
          {description}
        </Text>
      </Row>
    </Col>
  </Grid>
);

RadioItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

//const mapDispatchToProps = dispatch => ({
//  addRapport: () => dispatch(addRapport(this.state))
//});

export default connect()(BulletinAvalanche);
