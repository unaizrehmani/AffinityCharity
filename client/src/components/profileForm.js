import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
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

  handleSubmit = async () => {
    const { password1, password2, firstName, lastName, email } = this.state;
    const URL = `https://social-charity-server.herokuapp.com/api/users/${this.props.session.userID}`;

    if (password1 !== password2) {
      this.setState({
        error: true,
        errorHeader: 'Passwords do not match',
        errorContent: 'Please re-type your password'
      });
    } else {
      try {
        const result = await axios.patch(URL,
          {
            firstName,
            lastName,
            email
          },
          {
            headers: { Authorization: 'Bearer ' + this.props.session.userToken }
          }
        );
        console.log('result: ', result);
        this.setState({ 
          success: true, 
          error: false, 
          errorHeader: '', 
          errorContent: '' 
        });
      } catch (err) {
        console.log(err);
        this.setState({
          error: true,
          errorHeader: 'Server error',
          errorContent: 'Please log out and try again'
        });
      }
    }
    
  };

  render() {
    const { firstName, lastName, email, password1, password2 } = this.state;
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          loading={this.state.loading}
          error={this.state.error}
          success={this.state.success}
        >
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
            name="lastName"
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
