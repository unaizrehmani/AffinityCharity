import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'


export default class Cause extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity/>
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

Cause.defaultProps = {
  isPrimary: true,
  isLarge: false
}

Cause.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  isPrimary: PropTypes.bool,
  isLarge: PropTypes.bool,
  onPress: PropTypes.func
}
