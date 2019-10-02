import React, { Component } from 'react';
import EmailEditor from 'react-email-editor';
import styled from 'styled-components';
import axios from 'axios';
import MultipleEmail from '../components/multipleEmail';
import { Input } from 'semantic-ui-react';
import Button from '../components/button';
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

  exportHtml = () => {
    window.unlayer.exportHtml(data => {
      const html = `${String(data.html)}`;
      const email = this.state.emails;
      const subject = this.state.subject;
      axios
        .post(
          'https://social-charity-server.herokuapp.com/api/email/send-email',
          {
            email,
            html,
            subject
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  saveDesign = () => {
    // TODO: Implement save design functionality
    // window.unlayer.saveDesign(design => console.log(design));
  };

  onLoad = () => {
    axios
      .get('https://social-charity-server.herokuapp.com/api/email/emailDesign')
      .then(res => {
        this.setState({ design: res.data }, () => {
          window.unlayer.loadDesign(this.state.design);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render = () => {
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

        <EmailEditorStyle>
          <EmailEditor
            onLoad={this.onLoad}
            minHeight={'600px'}
            appearance={{
              theme: 'light'
            }}
          />
        </EmailEditorStyle>

        <ButtonStyle>
          <Button title="Send Email" primary handleClick={this.exportHtml} />
        </ButtonStyle>
      </EmailerStyle>
    );
  };
}
const EmailerStyle = styled.div`
  width: 100%;
  padding-right: 20px;
`;
const EmailEditorStyle = styled.div``;
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
export default Emailer;
