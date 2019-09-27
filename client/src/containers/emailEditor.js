import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";
class Emailer extends Component {
  render = () => {
    return (
      <div>
        <EmailEditor ref={editor => (this.editor = editor)} />
        <div style={{ paddingLeft: '20px', paddingTop: '5px' }}>
          <button onClick={this.exportHtml}>Send Email</button>
        </div>
      </div>
    );
  };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const html = `${String(data.html)}`;
      const email = "unaizrehmani@gmail.com";
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

export default Emailer;
