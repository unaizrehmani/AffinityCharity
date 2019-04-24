import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
    height: 170,
    backgroundColor: '#E35268',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 20,
    alignItems: 'center'
  },
  text: {
    color: '#F2F2F2',
    fontSize: 30,
    textTransform: 'uppercase',
    marginTop: 112
  }
})
