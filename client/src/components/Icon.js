import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Icon as SemanticIcon } from 'semantic-ui-react';

export default class Icon extends Component {
  render() {
    return (
        <StyledIcon {...this.props}/>
    );
  }
}

const StyledIcon = styled(SemanticIcon)`
  font-size: ${props => props.size === undefined ? '1.3em !important' : props.size}
  padding-right: 30px;
  color: ${props => props.color};
`;
