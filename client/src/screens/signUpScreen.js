import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Input from '../components/input'
import Button from '../components/button'

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Create Account'
  }

  render() {
    return (
      <View style={styles.container}>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Text>
          By creating an account you agree to our Terms of Service and Privacy
          Policy.
        </Text>
        <Button text="Sign Up" isLarge={true} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  }
})
