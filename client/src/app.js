import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Input from './components/input'
import Banner from './components/banner'
import CustomButton from './components/custombutton';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Banner title="Affinity" />
        <View style={styles.inputForm}>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <CustomButton text="Sign In" type="primary"/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  inputForm: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
