import React from 'react'
import styled from 'styled-components'
import { FormErrors } from '../components/formErrors'
import colors from '../styles/colors'
import { loginUser } from '../redux/actions/authentication'
import axios from 'axios'
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  onSubmit = e => {
    e.preventDefault()
    axios
      .post(
        'https://social-charity-server.herokuapp.com/api/auth/token',
        {
          email: this.state.email,
          password: this.state.password
        },
        { 'Content-Type': 'application/json' }
      )
      .then(response => {
        this.props.dispatch(loginUser(this.state.email, response.data))
      })
      .catch(error => {
        console.log('error ' + error)
      })
  }

  handleUserInput = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value }, () => {
      this.validateField(name, value)
    })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'
        break
      case 'password':
        passwordValid = value.length >= 6
        fieldValidationErrors.password = passwordValid ? '' : ' is too short'
        break
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    })
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error'
  }

  render() {
    return (
      <StyledLoginPage>
        <LoginForm>
          <h1>Sign In</h1>
          <div className='panel panel-default'>
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.email
            )}`}
          >
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              required
              className='form-control'
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleUserInput}
            />
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.password
            )}`}
          >
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleUserInput}
            />
          </div>
          <button onClick={this.onSubmit}>Login</button>
        </LoginForm>
      </StyledLoginPage>
    )
  }
}

const LoginForm = styled.form`
  padding: 50px;
  width: 300px;
  border: 1px solid primary;
  background-color: ${colors.secondary};
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
`

const StyledLoginPage = styled.div`
  display: flex;
`

export default LoginPage
