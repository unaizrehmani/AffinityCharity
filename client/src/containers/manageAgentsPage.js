import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ManageAgentsPage extends React.Component {
  render() {
    return (
      <ManageAgentsPageWrapper>
          <PageTitle>Manage your Agents</PageTitle>
      </ManageAgentsPageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

ManageAgentsPage.propTypes = {
};

const ManageAgentsPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    text-align: center;
`

const PageTitle = styled.h1`
`

export default connect(mapStateToProps)(ManageAgentsPage);
