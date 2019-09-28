import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CauseCardContainer = styled.div`
  display: flex;
  margin: 0 10px;
  flex-direction: column;
  border-radius: 10px;
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

const CauseImageContainer = styled.div`
  display: flex;
  height: 225px;
  width: 200px;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

const CauseCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5px;
`;

const CauseImage = styled.img`
  object-fit: cover;
`;

const CauseTitle = styled.p`
  font-size: 12px;
`;

const CauseDate = styled.p`
  font-size: 6px;
`;

const CauseDescription = styled.p`
  font-size: 8px;
`;

const Seperator = styled.hr`
  width: 100%;
  border: 1px solid #f2f2f2;
`;

const CauseSubscribers = styled.p``;

class CauseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CauseCardContainer>
        <CauseImageContainer>
          <CauseImage src={this.props.image} />
        </CauseImageContainer>
        <CauseCardContent>
          <CauseTitle>{this.props.title}</CauseTitle>
          <CauseDate>{this.props.date}</CauseDate>
          <CauseDescription>{this.props.description}</CauseDescription>
          <Seperator />
          <CauseSubscribers>{this.props.subscribers}</CauseSubscribers>
        </CauseCardContent>
      </CauseCardContainer>
    );
  }
}

CauseCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  subscribers: PropTypes.number
};

export default CauseCard;
