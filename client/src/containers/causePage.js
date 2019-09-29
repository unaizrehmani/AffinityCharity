import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';

class CausePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CausePageWrapper>
        <CauseBanner>

        </CauseBanner>
      </CausePageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

const CausePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CauseBanner = styled.div`
  height: 300px;
  background-color: ${colors.primary}
`;

const CauseImageContainer = styled.div`
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

const CauseImage = styled.img`
  height: 100px;
  width: 100px;
  object: cover;
`;

export default connect(mapStateToProps)(CausePage);
