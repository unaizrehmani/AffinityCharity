import React from "react";
import styled from "styled-components";
import CauseCard from "../components/causeCard";
import { connect } from "react-redux";

const HomePageContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
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

const MyImage = styled.img`
  height: 100px;
  width: 100px;
  object: cover;
`;

const UserHomeText = styled.h1`
  font-weight: 400;
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
        <ImageContainer>
          <MyImage
            src={
              "https://www.humanconcern.org/wp-content/uploads/2016/03/logo-body.png"
            }
          />
        </ImageContainer>
        <h2>
          Good Afternoon,{" "}
          {this.props.session.firstName + " " + this.props.session.lastName}
        </h2>
        <CausesContainer>
          <CauseCard
            title={"Jane Doe"}
            image={
              "https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038"
            }
            date={"June 30th, 2008"}
            description={"Absolute legend right here"}
            subscribers={23}
          />
          <CauseCard
            title={"Ahmad Ramadan"}
            image={
              "https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038"
            }
            date={"March 3rd, 2015"}
            description={"This nasty guy"}
            subscribers={23}
          />
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
