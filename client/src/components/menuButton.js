import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class MenuButton extends Component {
  render() {
    return (
      <IconButton
        onClick={() => {
          this.props.toggle(true);
        }}
      >
        <MenuIcon name='bars' />
      </IconButton>
    );
  }
}

const MenuIcon = styled(Icon)`
  color: ${colors.primary};
`;
