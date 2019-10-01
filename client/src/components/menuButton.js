import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'semantic-ui-react';

export default class MenuButton extends Component {
  render() {
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        style={{
          position: 'fixed'
        }}
        onClick={this.props.toggle}
      >
        <Icon name="bars" />
      </IconButton>
    );
  }
}
