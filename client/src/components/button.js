import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import {
  PRIMARY_ACCENT_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  BODY_FONT_SIZE
} from '../styles/constants'

export default class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={styles(this.props).button}
        onPress={event => this.props.onPress(event, this.props.name)}
      >
        <Text style={styles(this.props).text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = props =>
  StyleSheet.create({
    button: {
      display: 'flex',
      height: 48,
      width: props.isLarge ? 295 : 155,
      backgroundColor: props.isPrimary ? PRIMARY_ACCENT_COLOR : SECONDARY_COLOR,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      borderRadius: 24,
      elevation: 1,
      marginBottom: 10,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      color: props.isPrimary ? SECONDARY_COLOR : PRIMARY_COLOR,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: BODY_FONT_SIZE
    }
  })

Button.defaultProps = {
  isPrimary: true,
  isLarge: false
}

Button.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  isPrimary: PropTypes.bool,
  isLarge: PropTypes.bool,
  onPress: PropTypes.func
}
