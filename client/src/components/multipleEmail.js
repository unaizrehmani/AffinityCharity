import React, { Component } from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

class MultipleEmail extends Component {
  removeEmail = (email, index) => {
    return (
      <div data-tag key={index}>
        {email}
        <span data-tag-handle onClick={() => this.removeEmail(index)}>
          ×
        </span>
      </div>
    );
  };

  render = () => {
    const emails = this.props.emails;

    return (
      <div>
        <span>{this.props.label}</span>
        <ReactMultiEmail
          placeholder="Enter e-mails here"
          emails={emails}
          onChange={_emails => {
            this.props.updateEmails(_emails);
          }}
          validateEmail={email => {
            return isEmail(email);
          }}
          getLabel={(email, index, func) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => func(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />
        <br />
      </div>
    );
  };
}

export default MultipleEmail;
