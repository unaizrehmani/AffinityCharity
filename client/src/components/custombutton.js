import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types';
import {PRIMARY_ACCENT_COLOR, SECONDARY_COLOR, PRIMARY_COLOR, BACKGROUND_COLOR, BODY_FONT_SIZE} from '../../constants.js';

export default class CustomButton extends Component {


  render() {
    return (
      <Button style={styles.button} title={this.props.text}>
      </Button>
    )
  }
}



const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 155,
    backgroundColor: this.props.type == 'primary' ? PRIMARY_ACCENT_COLOR : SECONDARY_COLOR,
    color: this.props.type == 'primary' ? BACKGROUND_COLOR : PRIMARY_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 20,
    alignItems: 'center',
    fontSize: BODY_FONT_SIZE
  },
})

CustomButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
}
