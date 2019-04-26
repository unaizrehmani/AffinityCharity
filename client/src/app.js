import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Input from './components/input'
import Banner from './components/banner'
import Button from './components/button';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu'
// })
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

  render() {
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
          <Button text="Sign In"/>
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
    marginTop: 10,
    marginBottom: 20
  }
})
