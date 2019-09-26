import React, { Component } from "react";
import EmailEditor from "react-email-editor";
import axios from 'axios';
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
      const { html } = data;
      console.log("exportHtml", html);
      
    });
  };
}

export default Emailer;
