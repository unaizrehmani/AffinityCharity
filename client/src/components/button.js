import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import {PRIMARY_ACCENT_COLOR, SECONDARY_COLOR, PRIMARY_COLOR, BACKGROUND_COLOR, BODY_FONT_SIZE} from '../../constants.js';

export default class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={styles(this.props).button} onPress={this.props.onPress}>
        <Text style={styles(this.props).text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}



const styles = (props) => StyleSheet.create({
  button: {
    display: 'flex',
    height: 48,
    width: props.size,
    backgroundColor: props.type == 'primary' ? PRIMARY_ACCENT_COLOR : SECONDARY_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderRadius: 24,
    elevation: 1,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: props.type == 'primary' ? BACKGROUND_COLOR : PRIMARY_COLOR,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: BODY_FONT_SIZE,
  }
})

Button.defaultProps = {
  type: 'primary',
  size: 155,
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func
}
