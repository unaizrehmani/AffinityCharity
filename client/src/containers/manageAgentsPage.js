import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '../components/table';

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
          title: 'Causes',
          field: 'causes',
          type: 'numeric'
        }
      ],
      data: undefined
    };
  }

  componentDidMount = async () => {
    const AuthStr = 'Bearer '.concat(this.props.session.userToken);
    axios
      .get('https://social-charity-server.herokuapp.com/api/users', {
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

  render() {
    const renderTable =
      this.state.data === undefined ? (
        ''
      ) : (
        <Table
          title={'Admin'}
          columns={this.state.columns}
          data={this.state.data}
        />
      );
    return (
      <ManageAgentsPageWrapper>
        <PageTitle>Manage your Agents</PageTitle>
        {renderTable}
      </ManageAgentsPageWrapper>
    );
  }
}

ManageAgentsPage.propTypes = {};

const ManageAgentsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
`;

const PageTitle = styled.h1``;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(ManageAgentsPage);
