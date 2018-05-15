import React from 'react'
import PropTypes from 'prop-types'
//import Rapport from './Rapport'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Right } from 'native-base';
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    ScrollView
  } from 'react-native';

  import Icon from "react-native-vector-icons/Entypo";

class RapportList extends React.Component { 

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (

            <List>
                {this.props.rapports.map(rapport =>
                    <ListItem key={rapport.id}>
                        <Thumbnail square size={80} source={{ uri: 'aq' }} />
                        <Body>
                            <Text>{rapport.lieu} - {rapport.timestamp}</Text>
                            <Text note>{rapport.description}</Text>
                        </Body>
                        <Right>
                            <Icon name="check" size={20}/>
                        </Right>
                    </ListItem>
                )}
          </List>


        )
    }
}

            ////<View style={styles.container}>
            ////    <ScrollView>
            ////        {this.props.rapports.map(rapport =>
            //            <Rapport
            //                key={rapport.id}
            //                {...rapport}
            //                //onClick={() => toggleTodo(todo.id)}
            //            />
            //            )}
            //    </ScrollView>
            //</View>

//export default RapportList

//const RapportList = ({ rapports }) => (
//    <View style={styles.container}>
//        <ScrollView>
//            {rapports.map(rapport =>
//            <Rapport
//                key={rapport.id}
//                {...rapport}
//                //onClick={() => toggleTodo(todo.id)}
//            />
//            )}
//        </ScrollView>
//    </View>
//)

RapportList.propTypes = {
    rapports: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
        lieu: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = state => ({
    rapports: state.rapports
})

export default connect(
    mapStateToProps
    //mapDispatchToProps
)(RapportList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

