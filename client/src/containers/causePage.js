import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import CircularImage from '../components/circularImage'

class CausePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CausePageWrapper>
        <CauseBanner>
            <CircularImage 
              image={"https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038" } 
              style={{border: '2px solid #E35268', height: '200px', width: '200px'}}/>
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
  display: flex;
  flex-direction: column;
  height: 300px;
  background-color: ${colors.primary}
  align-items: center;
  text-align: center;
`;


export default connect(mapStateToProps)(CausePage);
