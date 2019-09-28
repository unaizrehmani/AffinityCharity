import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import styled from 'styled-components';
import axios from "axios";
import MultipleEmail from '../components/multipleEmail';
import { Input } from "semantic-ui-react";
import Button from "../components/button";
class Emailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: ['unaizrehmani@gmail.com'],
      subject: ''
    }
  }

  updateEmails = emails => {
    this.setState({ emails });
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render = () => {
    return (
      <div>
        <EmailEditorStyle>
          <EmailEditor ref={editor => (this.editor = editor)} />
        </EmailEditorStyle>
          
        <MultipleEmailStyle>
          <MultipleEmail emails={this.state.emails} updateEmails={this.updateEmails} />
          <FormInputStyle
              type="text"
              name="subject"
              value={this.state.subject}
              onChange={this.handleUserInput}
              label="subject"
              placeholder="Enter email subject"
            />
          <br/><br/>
          <ButtonStyle>
            <Button title="Send Email" primary handleClick={this.exportHtml} />
          </ButtonStyle>
        </MultipleEmailStyle>
      </div>
    );
  };

  exportHtml = () => {
    this.editor.exportHtml(data => {
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
}

const EmailEditorStyle = styled.div`
  padding-right: 20px;
`
const MultipleEmailStyle = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 5px;
`
const FormInputStyle = styled(Input)`
  input {
    width: 220px;
  }
  .label {
    width: 100px;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
export default Emailer;
