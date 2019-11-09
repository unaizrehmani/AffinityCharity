import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

// To-Do Add prop styles to allow for smaller input box
export default class TextArea extends Component {
  render() {
    return (
      <TextAreaContainer {...this.props}>
        <StyledTextArea
          onChange={this.props.onChange}
          name={this.props.name}
          type={this.props.type}
        />
      </TextAreaContainer>
    );
  }
}

const TextAreaContainer = styled.div`
  display: flex;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 0px 5px 10px 0px rgba(173, 173, 173, 1);
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  color: ${colors.primary};
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
