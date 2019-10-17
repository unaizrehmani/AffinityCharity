import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';

class CreateCausePage extends React.Component {
  render() {
    return (
      <CreateCausePageContainer>
          <h1>Create A Cause</h1>
          <CreateCauseFormContainer>
              <InputContainer>
                <InputTitle>Title</InputTitle>
                <Input style={{marginBottom: '10px', borderRadius: '0px'}} noLabel={true}></Input>
              </InputContainer>
            <Input noLabel={true}></Input>
          </CreateCauseFormContainer>
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
`;

const CreateCauseFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
`

const InputTitle = styled.h5`
`


export default connect(mapStateToProps)(CreateCausePage);
