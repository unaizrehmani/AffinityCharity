import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import {PRIMARY_COLOR, BACKGROUND_COLOR, BODY_FONT_SIZE} from '../../constants.js';

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
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 24,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 1,
    backgroundColor: BACKGROUND_COLOR,
    marginBottom: 10,
    marginTop: 10
  },
  text: {
    marginLeft: 25,
    color: PRIMARY_COLOR,
    fontSize: BODY_FONT_SIZE
  }
})
