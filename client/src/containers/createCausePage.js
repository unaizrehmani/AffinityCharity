import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class CreateCausePage extends React.Component {
  render() {
    return (
      <CreateCausePageContainer>
      </CreateCausePageContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

CreateCausePage.propTypes = {};

const CreateCausePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
`;

export default connect(mapStateToProps)(CreateCausePage);
