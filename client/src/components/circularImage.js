import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class CircularImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageContainer {...this.props}>
        <Image src={this.props.image} />
      </ImageContainer>
    );
  }
}

CircularImage.propTypes = {
  image: PropTypes.string
};

const ImageContainer = styled.div`
    margin: 10px;
    display: flex;
    height: 100px;
    width: 100px;
    justify-content: center;
    border-radius: 500px
    -webkit-border-radius: 500px;
    -moz-border-radius: 500px;
    -ms-border-radius: 500px;
    -o-border-radius: 500px;
    overflow: hidden;
`;

const Image = styled.img`
  object-fit: contain;
`;

export default CircularImage;
