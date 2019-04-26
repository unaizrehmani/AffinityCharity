import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import {PRIMARY_COLOR, BACKGROUND_COLOR, BODY_FONT_SIZE} from '../../constants.js';

export default class Input extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          onChangeText={text =>
            this.props.inputChangeHandler(text, this.props.name)
          }
          placeholder={this.props.placeholder}
          value={this.props.value}
          style={styles.text}
          secureTextEntry={this.props.secureTextEntry}
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
