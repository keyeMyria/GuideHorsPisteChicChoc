import React from "react";
import { Container, Content, List } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DownloadItem from "./DownloadItem";

import HeaderBar from "../../components/HeaderBar";

class CarteHorsConnection extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    offline_status: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    console.log("CarteHorsConnection componentDidMount ", this.props);
  }

  componentDidMount() {
    console.log("offline_status", this.props.offline_status);
  }

  render() {
    const items = Object.values(this.props.offline_status).sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return (
      <Container>
        <HeaderBar openDrawer={() => this.props.navigation.openDrawer()}>Carte Hors Connection</HeaderBar>
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
