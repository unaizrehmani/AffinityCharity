import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PostWrapper>
          <PostDate>March 1st, 2019</PostDate>
          <PostContentContainer>
          </PostContentContainer>
      </PostWrapper>
    );
  }
}

PostCard.propTypes = {
    post: PropTypes.object
};

const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostDate = styled.h3`
    color: ${colors.primary}
    margin: 0px;
`;

const PostContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 300px;
    background-color: ${colors.secondary}
`;

export default PostCard;
