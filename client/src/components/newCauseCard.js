import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

class newCauseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CauseCardContainer>
        <Plus>+</Plus>
        <Text>Create Cause</Text>
      </CauseCardContainer>
    );
  }
}

const CauseCardContainer = styled.div`
  display: flex;
  margin: 0 10px 20px 10px
  flex-direction: column;
  background-color: ${colors.secondary}
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 200px;
  position: relative;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  transition: box-shadow 0.2s linear;
  -webkit-transition: box-shadow 0.2s linear;
  -moz-transition: box-shadow 0.2s linear;
  &:hover {
    -webkit-box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
    -moz-box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
    box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
  }
`;

const Plus = styled.h1`
  font-size: 100px;
  margin: 0px;
  color: ${colors.primaryAccent};
`;

const Text = styled.h3`
  color: ${colors.primaryAccent};
`;

export default newCauseCard;
