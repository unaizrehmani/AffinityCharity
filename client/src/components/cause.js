import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { SECONDARY_COLOR, PRIMARY_COLOR, PRIMARY_ACCENT_COLOR, SUB_HEADING_FONT_SIZE } from '../styles/constants';
import { Icon } from 'react-native-elements';


export default class Cause extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={styles.card}>
          <Image 
            style={styles.image}
            source={{uri: this.props.image}}/>
        <View style={styles.textWrapper}>
            <Text style={styles.title}>{this.props.title}</Text>
            <View style={styles.circleButton}>
                <Icon
                    name='ios-arrow-round-forward'
                    type='ionicon'
                    size={30}
                    color={SECONDARY_COLOR}
                    />
            </View>
        </View>
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
    },
    image:{
        height: '100%',
        width: '60%',
    },
    textWrapper:{
        display: 'flex',
        width: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
      color: PRIMARY_COLOR,
      fontSize: SUB_HEADING_FONT_SIZE,
    },
    circleButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: PRIMARY_ACCENT_COLOR,
    }
  })


Cause.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}
