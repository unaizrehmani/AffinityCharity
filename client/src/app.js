import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar } from 'react-native'
import Input from './components/input'
import Banner from './components/banner'
import Button from './components/button'
import Seperator from './components/seperator'

import logo from './assets/logo.png'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (text, name) => {
    this.setState({ [name]: text })
  }

  handleButtonPress = (event, name) => {
    if (name === 'login') {
      alert('Logged In')
    } else alert('Sign Up')
  }

  render() {
    StatusBar.setBarStyle('light-content', true)
    return (
      <View style={styles.container}>
        <Banner title="Affinity" />
        <Image source={logo} style={styles.logo} />
        <View style={styles.inputForm}>
          <Input
            placeholder="Email"
            name="username"
            value={this.state.username}
            inputChangeHandler={this.handleInputChange}
          />
          <Input
            placeholder="Password"
            name="password"
            value={this.state.password}
            inputChangeHandler={this.handleInputChange}
            secureTextEntry={true}
          />
          <Button
            name="login"
            text="Continue"
            isLarge={true}
            isPrimary={false}
            onPress={this.handleButtonPress}
          />
          <Seperator />
          <Button
            name="signup"
            text="Sign Up"
            isLarge={true}
            isPrimary={true}
            onPress={this.handleButtonPress}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  inputForm: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 60,
    width: 60,
    marginTop: 20,
    marginBottom: 20
  }
})
