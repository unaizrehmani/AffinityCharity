import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";
class Emailer extends Component {
  render = () => {
    return (
      <div>
        <div>
          <button onClick={this.exportHtml}>Export HTML</button>
        </div>

        <EmailEditor ref={editor => (this.editor = editor)} />
      </div>
    );
  };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const html = `${String(data.html)}`;
      axios.post('https://social-charity-server.herokuapp.com/api/email/send-email', 
      html, 
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        res => {
          console.log(res);
        }
      ).catch(err => {
        console.log(err);
      });
    });
  };
}

export default Emailer;
