import React from "react";
import styled from "styled-components";
import CauseCard from "../components/causeCard";

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
    this.state = {
      curTime: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleTimeString()
      });
    }, 1000);
  }

  render() {
    return (
      <HomePageContainer>
        <h1>{this.state.curTime}</h1>
        <h2>Good Afternoon, User</h2>
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
export default HomePage;
