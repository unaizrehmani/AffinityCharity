import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MultipleEmail from '../components/multipleEmail';
import { Input } from 'semantic-ui-react';
import Button from '../components/button';
import { connect } from 'react-redux';
class Emailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: ['unaizrehmani@gmail.com'],
      subject: '',
      design: undefined
    };
  }
  updateEmails = emails => {
    this.setState({ emails });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  sendEmail = () => {
    const config = {
      headers: {'Authorization': `Bearer ${this.props.session.userToken}`}
    };
    const bodyParameters = {
      html: `${require('../constants/templates/newsletter').newsletter}`,
      email: this.state.emails,
      subject: this.state.subject
    }
    
    axios.post( 
      'https://social-charity-server.herokuapp.com/api/causes/send-email',
      bodyParameters,
      config
    ).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  };

  render = () => {
    const emailHTML = `${require('../constants/templates/newsletter').newsletterTemplate}`;
    console.log('emailHTML', emailHTML);
    return (
      <EmailerStyle>
        <FormInputStyle
          type="text"
          name="subject"
          value={this.state.subject}
          onChange={this.handleUserInput}
          label="Subject"
          placeholder="Enter email subject"
        />
        <MultipleEmailStyle>
          <MultipleEmail
            label="Bcc:"
            emails={this.state.emails}
            updateEmails={this.updateEmails}
          />
        </MultipleEmailStyle>
        <div dangerouslySetInnerHTML={{__html: emailHTML}}></div>
        <ButtonStyle>
          <Button title="Send Email" primary handleClick={this.sendEmail} />
        </ButtonStyle>
      </EmailerStyle>
    );
  };
}
const EmailerStyle = styled.div`
  width: 100%;
  padding-right: 20px;
`;
const MultipleEmailStyle = styled.div`
  padding-left: 20px;
  padding-top: 5px;
`;
const FormInputStyle = styled(Input)`
  padding-left: 20px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  .label {
    width: 100px;
    text-align: center;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(Emailer);
