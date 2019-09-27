import React from "react";
import styled from "styled-components";
import CauseCard from "../components/causeCard";
import { connect } from "react-redux";

const HomePageContainer = styled.div`
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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HomePageContainer>
        <h2>
          Good Afternoon,{" "}
          {this.props.session.firstName + " " + this.props.session.lastName}
        </h2>
        <CausesContainer>
          <CauseCard />
          <CauseCard />
          <CauseCard />
          <CauseCard />
        </CausesContainer>
      </HomePageContainer>
    );
  }
}
// export default HomePage;
const mapStateToProps = state => {
  return {
    session: state.authentication
  };
};
export default connect(mapStateToProps)(HomePage);
