import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';
import TextArea from '../components/textArea';
import colors from '../styles/colors';

class CreateCausePage extends React.Component {
  render() {
    return (
      <CreateCausePageContainer>
          <Header>
            <h1>Create a Cause</h1>
            <hr />
          </Header>
          <FormContainer>
              <InputContainer>
                <InputTitle>Title</InputTitle>
                <Input 
                    style={{marginBottom: '10px', borderRadius: '0px', height: '30px', width: '600px'}} 
                    noLabel={true}
                    onChange={() => {

                    }}/>
              </InputContainer>
              <InputContainer>
                <InputTitle>Type</InputTitle>
                <Input 
                    style={{marginBottom: '10px', borderRadius: '0px', height: '30px', width: '600px'}}
                    noLabel={true}
                    onChange={() => {

                    }}/>
              </InputContainer>
              <InputContainer>
                <InputTitle>Location</InputTitle>
                <Input 
                    style={{marginBottom: '10px', borderRadius: '0px', height: '30px', width: '600px'}} 
                    noLabel={true}
                    onChange={() => {

                    }}/>
              </InputContainer>
              <InputContainer>
                <InputTitle>Description</InputTitle>
                <TextArea style={{width: '600px'}}/>
              </InputContainer>
          </FormContainer>
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
`;

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

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    width: 600px;
`

const InputTitle = styled.h5`
    text-align: left;
    width: 100%;
    margin: 0px;
`


export default connect(mapStateToProps)(CreateCausePage);
