import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import styled from 'styled-components';
import axios from "axios";
import MultipleEmail from '../components/multipleEmail';

class Emailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: ['unaizrehmani@gmail.com']
    }
  }

  updateEmails = emails => {
    this.setState({ emails });
  }

  render = () => {
    return (
      <div>
        <EmailEditorStyle>
          <EmailEditor ref={editor => (this.editor = editor)} />
        </EmailEditorStyle>
          
        <MultipleEmailStyle>
          <MultipleEmail emails={this.state.emails} updateEmails={this.updateEmails} />
          <button onClick={this.exportHtml}>Send Email</button>
        </MultipleEmailStyle>
      </div>
    );
  };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const html = `${String(data.html)}`;
      const email = this.state.emails;
      const subject = "Shefali Jain";
      axios
        .post(
          "https://social-charity-server.herokuapp.com/api/email/send-email",
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
export default Emailer;
