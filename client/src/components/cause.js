import React, { Component } from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { SECONDARY_COLOR } from '../styles/constants';


export default class Cause extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={styles.card}>
          <Image 
            style={styles.image}
            source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}/>
          <Text>HELLO</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      height: 170,
      width: '95%',
      backgroundColor: SECONDARY_COLOR,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      elevation: 1,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image:{
        height: '100%',
        width: '60%',
    },
    text: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
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
