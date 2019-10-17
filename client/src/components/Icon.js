import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Icon as SemanticIcon } from 'semantic-ui-react';

export default class Icon extends Component {
  render() {
    return (
        <StyledIcon name={this.props.name} />
    );
  }
}

const StyledIcon = styled(SemanticIcon)`
  font-size: 1.3em !important;
  padding-right: 30px;
`;
