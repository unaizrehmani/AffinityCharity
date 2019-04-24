import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      field: ''
    }
  }

  inputChangHandler = val => {
    this.setState({
      field: val
    })
  }

  render() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={this.inputChangHandler}
          placeholder={this.props.placeholder}
          value={this.state.field}
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
    backgroundColor: '#ffff',
    marginBottom: 10,
    marginTop: 10
  },
  text: {
    marginLeft: 25,
    color: '#474B53',
    fontSize: 14
  }
})
