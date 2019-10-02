import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../redux/actions/authentication';
import Button from '../components/button';
import colors from '../styles/colors';

class SidePanel extends Component {
  onLogout = () => {
    this.props.dispatch(logoutUser());
  };
  render() {
    return (
      <StyledSidePanel>
        <div onClick={this.props.toggle}>
          <NavItem>
            <Link to="/">Link1</Link>
          </NavItem>
          <NavItem>
            <Link to="/">Link2</Link>
          </NavItem>
          <NavItem>
            <Link to="/">Link3</Link>
          </NavItem>
          <NavItem>
            <Link to="/">Link4</Link>
          </NavItem>
        </div>
        <Button title="Log Out" primary handleClick={this.onLogout} />
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
  a:link {
    text-decoration: none;
    color: inherit;
  }

  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const NavItem = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  font-size: 25px;
  color: ${colors.primary};
`;

export default connect()(SidePanel);
