import React from "react";
import styled from "styled-components";

const CauseCardContainer = styled.div`
  display: flex;
  margin: 0 10px;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  height: 300px;
  width: 200px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s linear;
  -webkit-transition: box-shadow 0.2s linear;
  -moz-transition: box-shadow 0.2s linear;
  &:hover {
    -webkit-box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
    -moz-box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
    box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
  }
`;

const CauseImageContainer = styled.div`
  display: flex;
  height: 225px;
  width: 200px;
  justify-content: center;
  border: 1px solid black;
  overflow: hidden;
`;

const CauseImage = styled.img`
  object-fit: cover;
`;

const CauseTitle = styled.p``;

class CauseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CauseCardContainer>
        <CauseImageContainer>
          <CauseImage />
        </CauseImageContainer>
        <CauseTitle>Jane Doe</CauseTitle>
      </CauseCardContainer>
    );
  }
}
export default CauseCard;
