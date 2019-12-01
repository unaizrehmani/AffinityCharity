import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import Table from '../components/table';
const { URL } = require('../util/baseURL');
class ManageAgentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Name',
          field: 'firstName'
        },
        {
          title: 'Surname',
          field: 'lastName'
        },
        {
          title: 'Email',
          field: 'email'
        },
        {
          title: 'Admin',
          field: 'isAdmin',
          type: 'boolean'
        }
      ],
      data: undefined
    };
  }

  componentDidMount = async () => {
    const AuthStr = 'Bearer '.concat(this.props.session.userToken);
    axios
      .get(`${URL}/api/users`, {
        params: {},
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  setTableData = data => {
    this.setState({ data });
  };

  renderTable = () => {
    return this.state.data === undefined ? (
      ''
    ) : (
      <Table
        title={'Admin'}
        userToken={this.props.session.userToken}
        columns={this.state.columns}
        isAdmin={this.props.session.isAdmin}
        data={this.state.data}
        setTableData={this.setTableData}
      />
    );
  };

  render() {
    return (
      <Container>
        <HeaderStyle>
          <Header>
            <h2 className="ui center aligned icon header">
              <i className="circular icon chess king"> </i>
              Admin
            </h2>
          </Header>
        </HeaderStyle>
        {this.renderTable()}
      </Container>
    );
  }
}

const HeaderStyle = styled.div`
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(ManageAgentsPage);
