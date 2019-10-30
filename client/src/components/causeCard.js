import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../styles/colors';
import Icon from '../components/Icon';
import { Redirect } from 'react-router-dom';
class CauseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  renderCauseCard = () => {
    return (
      <div onClick={this.handleClick}>
        <CauseCardContainer>
          <CauseImageContainer url={this.props.image} />
          <CauseCardContent>
            <CauseTitle>{this.props.title}</CauseTitle>
            <CauseLocation>{this.props.location}</CauseLocation>
            <CauseDescription>{this.props.description}</CauseDescription>
            <CauseSubscriberCount>
              <Icon
                style={{ paddingRight: '0px' }}
                name="user"
                size="small"
                color="red"
              />
              {this.props.subscribers}
            </CauseSubscriberCount>
          </CauseCardContent>
        </CauseCardContainer>
      </div>
    );
  };

  render() {
    return this.state.redirect ? (
      <Redirect push to={'/editor/' + this.props.id} />
    ) : (
      this.renderCauseCard()
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

const CauseCardContainer = styled.div`
  display: flex;
  margin: 0 10px 20px 10px;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.secondary};
  border-radius: 5px;
  width: 260px;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
  }
`;

const CauseImageContainer = styled.div`
  height: 150px;
  width: 100%;
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const CauseCardContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const CauseTitle = styled.h3`
  margin: 0px;
`;

const CauseLocation = styled.h5`
  font-size: 12px;
  margin: 0px;
  font-weight: 700;
  color: gray;
`;

const CauseDescription = styled.h5`
  margin: 10px 0 0 0;
  font-weight: 100;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 260px;
  padding: 0 5px;
  overflow: hidden;
`;

const CauseSubscriberCount = styled.h5`
  margin: 10px 0 0 0;
  font-weight: 100;
`;

export default CauseCard;
