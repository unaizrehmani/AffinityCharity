import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNavBarElementClick = this.onNavBarElementClick.bind(this);
  }
  onNavBarElementClick() {
    if (this.props.closerMenu !== undefined) {
      this.props.closerMenu();
    }
  }

  render() {
    return (
      <StyledSidePanel>
        <ContentNavigation>
          <NavItem onClick={() => this.onNavBarElementClick()}>
            <Link to="/story">My Story</Link>
          </NavItem>
          <NavItem onClick={() => this.onNavBarElementClick()}>
            <Link to="/works">Works</Link>
          </NavItem>
          <NavItem onClick={() => this.onNavBarElementClick()}>
            <Link to="/services">Services</Link>
          </NavItem>
          <NavItem onClick={() => this.onNavBarElementClick()}>
            <Link to="/contact">Contact</Link>
          </NavItem>
        </ContentNavigation>
      </StyledSidePanel>
    );
  }
}

const StyledSidePanel = styled.div`
  width: 20vw;
  min-width: 250px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadein 2s;
  background-color: red;
  position: relative;
  @media screen and (max-width: 991px) {
    position: relative;
  }
`;
const ContentNavigation = styled.div`
  position: relative;
  margin-top: 45px;
`;
const NavItem = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  font-size: 25px;
`;
