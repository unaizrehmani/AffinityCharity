import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  PRIMARY_ACCENT_COLOR,
  SECONDARY_COLOR,
  HEADING_FONT_SIZE
} from '../../constants.js'

export default class Banner extends Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 170,
    backgroundColor: PRIMARY_ACCENT_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 1,
    alignItems: 'center'
  },
  text: {
    color: SECONDARY_COLOR,
    fontSize: HEADING_FONT_SIZE,
    textTransform: 'uppercase',
    marginTop: 112
  }
})
