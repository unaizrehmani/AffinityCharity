import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import colors from '../styles/colors';
import Input from '../components/input';
import Button from '../components/button';
import AffinityLogo from '../images/logo.svg';
import { Message, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { URL } from '../util/baseURL';

class RegisterPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      causeId: this.props.match.params.id,
      charity: 'HCI',
      causeDescription: '',
      callbackMessage: '',
      error: false,
      success: false
    };
  }

  currentSubscribers = () => {
    return (
      <List divided verticalAlign="middle">
        {this.state.donors &&
          this.state.donors.map((donor, index) => {
            return (
              <List.Item key={index}>
                <List.Content>{donor.email}</List.Content>
              </List.Item>
            );
          })}
      </List>
    );
  };

  validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  setCause = async () => {
    axios
      .get(`${URL}/api/causes/${this.state.causeId}`)
      .then(({ data }) => {
        this.setState({
          causeName: data.name,
          causeImage: data.mediaURL,
          causeLocation: data.location,
          causeDescription: data.description,
          donors: data.donors
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  componentDidMount = async () => {
    await this.setCause();
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submitEmail = () => {
    const email = this.state.email;
    if (this.validateEmail(email)) {
      axios
        .post(
          `${URL}/api/donors`,
          {
            email: this.state.email,
            causeId: this.state.causeId
          },
          { 'Content-Type': 'application/json' }
        )
        .then(() => {
          this.setState({
            callbackMessage: 'You\'ve been subscribed successfully!',
            success: true,
            error: false
          });
          this.setCause();
        })
        .catch(({ response }) => {
          this.setState({
            callbackMessage: `${response.data.message}`,
            error: true,
            success: false
          });
        });
    } else {
      this.setState({
        callbackMessage: 'Please provide a valid email',
        error: true,
        success: false
      });
    }
  };

  informationMessage = () => {
    if (this.props.session.isAdmin) {
      return 'Please enter the subscribers email to follow this cause';
    } else {
      return `You have been invited by ${this.state.charity} to follow this
      cause. Please enter your email below to receive emails from Affinity
      when this cause is updated.`;
    }
  };

  callbackMessage = () => {
    if (this.state.error) {
      return <Message error header={this.state.callbackMessage} />;
    } else if (this.state.success) {
      return <Message success header={this.state.callbackMessage} />;
    }
    return '';
  };

  inputTitle = () => {
    if (this.props.session.isAdmin) {
      return 'Subscriber email:';
    } else {
      return 'Your email:';
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
        <Information>{this.informationMessage()}</Information>
        <CauseContainer>
          <CauseTitle>{this.state.causeName}</CauseTitle>
          <CauseCharity>Managed By {this.state.charity}</CauseCharity>
          <CauseImageContainer url={this.state.causeImage} />
          <CauseInfoTitle>Description</CauseInfoTitle>
          <CauseInfo>{this.state.causeDescription}</CauseInfo>
          <CauseInfoTitle>Location</CauseInfoTitle>
          <CauseInfo>{this.state.causeLocation}</CauseInfo>
          {this.props.session.isAdmin && (
            <div>
              <CauseInfoTitle>Subscribers</CauseInfoTitle>
              <CauseInfo>{this.currentSubscribers()}</CauseInfo>
            </div>
          )}
        </CauseContainer>
        <FormContainer>
          <InputContainer>
            <InputTitle>{this.inputTitle()}</InputTitle>
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
            title="Subscribe"
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

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(RegisterPageContainer);
