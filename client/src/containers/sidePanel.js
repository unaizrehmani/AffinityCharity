import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class SidePanel extends Component {
  render() {
    return (
      <StyledSidePanel>
        <ContentNavigation>
          <NavItem>
            <Link to='/'>Link1</Link>
          </NavItem>
          <NavItem>
            <Link to='/'>Link2</Link>
          </NavItem>
          <NavItem>
            <Link to='/'>Link3</Link>
          </NavItem>
          <NavItem>
            <Link to='/'>Link4</Link>
          </NavItem>
        </ContentNavigation>
      </StyledSidePanel>
    );
  }
}

const StyledSidePanel = styled.div`
  width: 250px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
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
  color: ${colors.primary};
`;
