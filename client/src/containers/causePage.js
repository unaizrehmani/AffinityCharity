import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import CircularImage from '../components/circularImage';
import Button from '../components/button';
import PostCard from '../components/postCard';
import PropTypes from 'prop-types';

class CausePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CausePageWrapper>
        <CauseBanner>
          <CircularImage
            image={
              'https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038'
            }
            style={{
              border: '2px solid #E35268',
              height: '200px',
              width: '200px'
            }}
          />
          <CauseTitle>Jane Doe</CauseTitle>
          <CauseLocation>Dhaka, Bangladesh</CauseLocation>
          <CircularImage
            image={
              'https://www.humanconcern.org/wp-content/uploads/2016/03/logo-body.png'
            }
            style={{ height: '50px', width: '50px' }}
          />
          <ButtonWrapper>
            <Button title="Create Post" primary></Button>
            <Button title="Reports" primary></Button>
          </ButtonWrapper>
        </CauseBanner>
        <CauseContent>
          <PostCard />
          <Seperator />
          <PostCard />
        </CauseContent>
      </CausePageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

CircularImage.propTypes = {
  cause: PropTypes.object
};

const CausePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CauseBanner = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: ${colors.primary}
  color: ${colors.background}
  align-items: center;
  text-align: center;
`;

const CauseTitle = styled.h1`
  margin: 0px;
`;
const CauseLocation = styled.h5`
  margin: 0px;
  font-weight: 100;
`;

const CauseContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Seperator = styled.div`
  margin: 10px 0px;
  height: 50px;
  width: 3px;
  background-color: ${colors.primaryAccent};
`;

export default connect(mapStateToProps)(CausePage);
