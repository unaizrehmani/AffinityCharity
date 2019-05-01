import React, { Component } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import SignInScreen from './screens/signInScreen'
import SignUpScreen from './screens/signUpScreen'
import {
  SECONDARY_COLOR,
  PRIMARY_ACCENT_COLOR,
  PRIMARY_COLOR,
  SUB_HEADING_FONT_SIZE
} from './styles/constants'

const AppNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen
    },
    SignUp: {
      screen: SignUpScreen
    }
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: SECONDARY_COLOR
      },
      headerTintColor: PRIMARY_ACCENT_COLOR,
      headerTitleStyle: {
        fontSize: SUB_HEADING_FONT_SIZE,
        color: PRIMARY_COLOR
      },
      headerBackTitle: null
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}
