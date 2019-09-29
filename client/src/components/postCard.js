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
            <PostText>
                Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit, 
                sed do eiusmod tempor #incididunt ero labore et dolore magna aliqua…
            </PostText>
            <PostImageContainer>
                <PostImage src={"https://secureservercdn.net/104.238.71.140/9kn.2fe.myftpupload.com/wp-content/uploads/2014/10/kids_web-768x532.jpg"}/>
            </PostImageContainer>
          </PostContentContainer>
      </PostWrapper>
    );
  }
}

PostCard.propTypes = {
    post: PropTypes.object,
    text: PropTypes.string,
    image: PropTypes.string,
};

const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostContentContainer = styled.div`
    display: flex;
    padding: 15px 28px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 700px;
    height: 300px;
    background-color: ${colors.secondary}
    -webkit-box-shadow: 3px 4px 6px 0px rgba(0,0,0,0.19);
    -moz-box-shadow: 3px 4px 6px 0px rgba(0,0,0,0.19);
    box-shadow: 3px 4px 6px 0px rgba(0,0,0,0.19);

`;

const PostDate = styled.h3`
    color: ${colors.primary}
    margin: 0px;
`;

const PostImageContainer = styled.div`
    display: flex;
    width: inherit;
    justify-content: center;
    overflow: hidden;
`;

const PostImage = styled.img`
    object-fit: contain;
`;

const PostText =  styled.h3`
    font-weight: 100;
`;

export default PostCard;
