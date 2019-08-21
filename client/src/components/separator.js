import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { PRIMARY_ACCENT_COLOR, PRIMARY_COLOR } from '../styles/constants'
import PropTypes from 'prop-types'

export default class Separator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles(this.props).separator} />
  }
}

const styles = props =>
  StyleSheet.create({
    separator: {
      height: 4,
      width: props.isLarge ? 100 : 24,
      backgroundColor: props.isPrimary ? PRIMARY_COLOR : PRIMARY_ACCENT_COLOR,
      borderRadius: 2,
      marginBottom: props.separation,
      marginTop: props.separation
    }
  })

Separator.defaultProps = {
  isPrimary: true,
  isLarge: false,
  separation: 70
}

Separator.propTypes = {
  isPrimary: PropTypes.bool,
  isLarge: PropTypes.bool,
  seperation: PropTypes.number
}
