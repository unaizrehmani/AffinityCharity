import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Checkbox, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      errorHeader: '',
      errorContent: '',
      firstName: this.props.session.firstName || '',
      lastName: this.props.session.lastName || '',
      email: this.props.session.email || '',
      mediaURL: this.props.session.mediaURL || '',
      password1: '',
      password2: '',
      success: false
    };
  }

  handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { firstName, lastName, email, password1, password2 } = this.state;
    if(password1 !== password2) {
        this.setState({ error: true, errorHeader: 'Passwords do not match', errorContent: 'Please re-type your password' });
    } else {
        this.setState({ error: false, errorHeader: '', errorContent: '' })
    }
  };

  render() {
    const { firstName, lastName, email, mediaURL, password1, password2 } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} loading={this.state.loading} error={this.state.error} success={this.state.success}>

            <Form.Input
              placeholder="First Name"
              label="First Name"
              name="firstName"
              onChange={this.handleChange}
              value={firstName}
            />
            <Form.Input
              placeholder="Last Name"
              label="Last Name"
              name="lasttName"
              onChange={this.handleChange}
              value={lastName}
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
            <Form.Input
              placeholder="Password"
              label="Password"
              name="password1"
              type="password"
              onChange={this.handleChange}
              value={password1}
            />
            <Form.Input
              placeholder="Re-Type Password"
              label="Re-Type Password"
              name="password2"
              type="password"
              onChange={this.handleChange}
              value={password2}
            />
            <Message 
                error
                header={this.state.errorHeader}
                content={this.state.errorContent}
            />
            <Message 
                success
                header={'You have successfully changed your settings!'}
            />
            <Form.Button content="Update" color="green" />
        </Form>
      </div>
    );
  }
}

export default ProfileForm;
