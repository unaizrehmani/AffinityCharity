import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class Input extends Component {
  render() {
    return (
      <StyledContainer>
        <StyledLabel>
          <StyledIcon name={this.props.icon} />
        </StyledLabel>
        <StyledInput></StyledInput>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  display: flex;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(173, 173, 173, 1);
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 0px 5px 15px 0px rgba(173, 173, 173, 1);
  }
`;

const StyledInput = styled.input`
  width: 400px;
  border-radius: 0 20px 20px 0;
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
  background-color: ${colors.secondary};
  :focus {
    outline: none;
  }
  padding-left: 10px;
  font-size: 20px;
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 65px;
  height: 35px;
  background-color: ${colors.primaryAccent};
  border-radius: 20px 0 0 20px;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.3em !important;
  color: ${colors.background};
  margin: 0 !important;
`;
