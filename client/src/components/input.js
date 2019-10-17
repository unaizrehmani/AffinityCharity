import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import colors from '../styles/colors';

// To-Do Add prop styles to allow for smaller input box
export default class Input extends Component {
  render() {
    return (
      <StyledContainer {...this.props}>
        {this.props.noLabel ? '' : <StyledLabel><StyledIcon name={this.props.icon} /></StyledLabel>}
        <StyledInput {...this.props}
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={event => this.props.onChange(event)}
        />
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  display: flex;
  border-radius: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 0px 5px 10px 0px rgba(173, 173, 173, 1);
  }
`;

const StyledInput = styled.input`
  width: 400px;
  color: ${colors.primary};
  border-radius: 0 20px 20px 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.secondary};
  padding-left: 10px;
  font-size: 16px;
  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.5; /* Firefox */
  }
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
