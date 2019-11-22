import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import colors from '../styles/colors';
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
        <Header>
          <h1>Manage Agents</h1>
          <hr />
        </Header>
        {this.renderTable()}
      </Container>
    );
  }
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  margin-bottom: 20px;
  margin-top: 50px;
  h1 {
    font-size: 40px !important;
  }
  hr {
    height: 0.2rem;
    width: 80%;
    background: ${colors.primary};
    border: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.2rem;
  }
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
