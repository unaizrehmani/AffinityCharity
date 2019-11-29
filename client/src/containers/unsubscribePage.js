import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import colors from '../styles/colors';
import Input from '../components/input';
import Button from '../components/button';
import AffinityLogo from '../images/logo.svg';
import { Message } from 'semantic-ui-react';
import { URL } from '../util/baseURL';

export default class UnsubscribePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      causeId: this.props.match.params.id,
      charity: 'HCI'
    };
  }

  componentDidMount = async () => {
    axios
      .get(`${URL}/api/causes/${this.state.causeId}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          causeName: data.name,
          causeImage: data.mediaURL,
          causeLocation: data.location,
          causeDescription: data.description
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submitEmail = () => {
    axios
      .post(
        `${URL}/api/donors/unsubscribe/`,
        {
          email: this.state.email,
          causeId: this.state.causeId
        },
        { 'Content-Type': 'application/json' }
      )
      .then(() => {
        this.setState({
          error: false,
          success: true,
          callbackMessage: 'You\'ve been unsubscribed successfully!'
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          success: false,
          callbackMessage: 'There was an error trying to unsubscribe!'
        });
      });
  };

  callbackMessage = () => {
    if (this.state.error) {
      return <Message error header={this.state.callbackMessage} />;
    } else if (this.state.success) {
      return <Message success header={this.state.callbackMessage} />;
    } else {
      return '';
    }
  };

  render() {
    return (
      <Container>
        <Banner>
          <img
            width={100}
            src={AffinityLogo}
            alt={'Affinity Logo - Holding Hands'}
          />
          <h2>Affinity</h2>
        </Banner>
        <Information>
          You are currently subscribed to this cause by {this.state.charity}. To
          unsubscribe please enter your email below to confirm being removed
          from this causes mailing list.
        </Information>
        <CauseContainer>
          <CauseTitle>{this.state.causeName}</CauseTitle>
          <CauseCharity>Managed By {this.state.charity}</CauseCharity>
          <CauseImageContainer url={this.state.causeImage} />
          <CauseInfoTitle>Description</CauseInfoTitle>
          <CauseInfo>{this.state.causeDescription}</CauseInfo>
          <CauseInfoTitle>Location</CauseInfoTitle>
          <CauseInfo>{this.state.causeLocation}</CauseInfo>
        </CauseContainer>
        <FormContainer>
          <InputContainer>
            <InputTitle>Your Email</InputTitle>
            <Input
              id="input-email"
              name="email"
              size="large"
              type="email"
              placeholder="john.doe@email.com"
              value={this.state.email}
              onChange={this.handleUserInput}
              noLabel={true}
            />
          </InputContainer>
          {this.callbackMessage()}
          <Button
            id="button-subscribe"
            title="Unsubscribe"
            primary
            handleClick={this.submitEmail}
          />
        </FormContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 5vh;
  margin-bottom: 15px;
`;

const Information = styled.p`
  text-align: center;
  font-weight: bold !important;
  width: 500px;
  padding-bottom: 30px;
`;

const CauseContainer = styled.div`
  margin: 0 10px 20px 10px;
  background-color: ${colors.secondary};
  border-radius: 5px;
  width: 600px;
  height: 500px;
  box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  padding-bottom: 10px;
  overflow: auto;
`;

const CauseTitle = styled.h2`
  padding-top: 10px;
  text-align: center;
`;

const CauseCharity = styled.h3`
  padding-bottom: 5px;
  text-align: center;
  font-weight: bold !important;
`;

const CauseImageContainer = styled.div`
  height: 250px !important;
  width: 100%;
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const CauseInfoTitle = styled.h3`
  font-weight: bold !important;
  padding-left: 15px;
  padding-bottom: 10px;
  padding-top: 15px;
`;

const CauseInfo = styled.p`
  font-weight: 100;
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
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
  margin: 5px;
`;

const InputTitle = styled.h5`
  text-align: left;
  width: 100%;
  margin: 0px;
`;
