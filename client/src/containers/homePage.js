import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CauseCard from '../components/causeCard';
import CircularImage from '../components/circularImage';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HomePageContainer>
        <CircularImage image={"https://www.humanconcern.org/wp-content/uploads/2016/03/logo-body.png"}/>
        <h2>
          Good Afternoon,
          {`${this.props.session.firstName} ${this.props.session.lastName}`}
        </h2>
        <CausesContainer>
          <CauseCard
            title="Jane Doe"
            image="https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038"
            date="June 30th, 2008"
            description="Absolute legend right here"
            subscribers={23}
          />
          <CauseCard
            title="Ahmad Ramadan"
            image="https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038"
            date="March 3rd, 2015"
            description="This nasty guy"
            subscribers={23}
          />
        </CausesContainer>
      </HomePageContainer>
    );
  }
}
// export default HomePage;
const mapStateToProps = state => ({
  session: state.authentication
});

const HomePageContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`;

const CausesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default connect(mapStateToProps)(HomePage);
