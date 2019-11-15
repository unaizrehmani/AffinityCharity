import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Button from './button';
import { loginUser } from '../redux/actions/authentication';
import axios from 'axios';

const { URL } = require('../util/baseURL');
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
      oldPassword: '',
      password1: '',
      password2: '',
      success: false
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const {
      password1,
      password2,
      firstName,
      lastName,
      email,
      oldPassword
    } = this.state;
    this.setState({ loading: true });
    if (password1 !== password2) {
      this.setState({
        error: true,
        success: false,
        errorHeader: 'Passwords do not match',
        errorContent: 'Please re-type your password'
      });
    } else {
      try {
        const oldEmail = this.props.session.email;
        const newPassword = password1;

        const result = await axios.patch(
          `${URL}/api/users/${this.props.session.userID}`,
          {
            firstName,
            lastName,
            email,
            newPassword,
            oldPassword,
            oldEmail
          },
          {
            headers: { Authorization: 'Bearer ' + this.props.session.userToken }
          }
        );
        console.log('result: ', result.data);
        const { errorHeader, errorContent } = result.data;
        if (errorHeader && errorContent) {
          this.setState({
            success: false,
            error: true,
            errorHeader,
            errorContent
          });
        } else {
          this.setState(
            {
              success: true,
              error: false,
              errorHeader: '',
              errorContent: ''
            },
            () => {
              const fn = result.data.firstName;
              const ln = result.data.lastName;
              const admin = result.data.isAdmin;
              const mail = result.data.email;
              const _id = result.data._id;
              this.props.dispatch(
                loginUser(
                  fn,
                  ln,
                  admin,
                  mail,
                  this.props.session.userToken,
                  _id
                )
              );
            }
          );
        }
      } catch (err) {
        console.log(err);
        this.setState({
          error: true,
          success: false,
          errorHeader: 'Server error',
          errorContent: 'Please contact tech support'
        });
      }
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password1,
      password2,
      oldPassword
    } = this.state;
    return (
      <div>
        <Form
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
            placeholder="Current Password"
            label="Current Password"
            name="oldPassword"
            type="password"
            onChange={this.handleChange}
            value={oldPassword}
          />
          <Form.Input
            placeholder="New Password"
            label="New Password"
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
          <ButtonStyle>
            <Button primary handleClick={this.handleSubmit}>
              <Icon name="edit"></Icon>
              Update
            </Button>
          </ButtonStyle>
        </Form>
      </div>
    );
  }
}

const ButtonStyle = styled.div`
  margin-left: -10px;
  margin-top: 20px;
`;

export default connect()(ProfileForm);
