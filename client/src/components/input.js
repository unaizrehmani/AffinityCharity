import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      placeholder: this.props.placeholder
    }
  }

  usernameChangHandler = val => {
    this.setState({
      username: val
    })
  }

  render() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={this.usernameChangHandler}
          placeholder={this.state.placeholder}
          value={this.state.username}
          style={styles.text}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: 295,
    height: 48,
    borderColor: '#474B53',
    borderWidth: 2,
    borderRadius: 24,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 1,
    backgroundColor: '#ffff'
  },
  text: {
    marginLeft: 20,
    color: '#474B53',
    fontSize: 14
  }
})
