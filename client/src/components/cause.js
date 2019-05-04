import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { SECONDARY_COLOR } from '../styles/constants';


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
      flexDirection: 'row',
      height: 170,
      width: '95%',
      backgroundColor: SECONDARY_COLOR,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 6,
      borderRadius: 24,
      elevation: 1,
      marginBottom: 5,
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
