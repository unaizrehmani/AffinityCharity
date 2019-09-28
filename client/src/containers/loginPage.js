import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import Button from '../components/button';
import AffinityLogo from '../images/logo.svg';
import colors from '../styles/colors';
import { loginUser } from '../redux/actions/authentication';
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  onLoginSubmit = () => {
    alert('Logging In.');
    axios
      .post(
        'https://social-charity-server.herokuapp.com/api/auth/token',
        {
          email: this.state.email,
          password: this.state.password,
        },
        { 'Content-Type': 'application/json' },
      )
      .then((response) => {
        const { firstName, lastName, isAdmin, email, token } = response.data;
        this.props.dispatch(loginUser(firstName, lastName, isAdmin, email, token));
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm,
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  };

  errorClass = (error) => {
    return error.length === 0 ? '' : 'has-error';
  };

  render() {
    return (
      <StyledLoginPage>
        <Banner>
          <img width={300} src={AffinityLogo} />
          <h1>Welcome to Affinity</h1>
        </Banner>
        <LoginForm>
          <Form>
            <FormInput
              type="email"
              required
              name="email"
              value={this.state.email}
              onChange={this.handleUserInput}
              label="Email"
              placeholder="john.doe@email.com"
            />
            <FormInput
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleUserInput}
              label="Password"
            />
          </Form>
          <ButtonPrompts>
            <Button title="Sign In" primary handleClick={this.onLoginSubmit} />
            <Button title="Forgot Password" primary={false} />
          </ButtonPrompts>
        </LoginForm>
      </StyledLoginPage>
    );
  }
}

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10vh;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  background: ${colors.secondary};
`;

const ButtonPrompts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const FormInput = styled(Input)`
  input {
    width: 220px;
  }
  .label {
    width: 100px;
  }
  margin: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export default connect()(LoginPage);
