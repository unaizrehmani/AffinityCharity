import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
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
        <Banner>
          <Avatar
            url={
              'https://www.humanconcern.org/wp-content/uploads/2016/03/logo-body.png'
            }
          />
          <h3>Jane Doe</h3>
        </Banner>
        <Navigation onClick={this.props.toggle}>
          <Link to='/'>
            <NavItem>
              <StyledIcon name='home' />
              <h3>Home</h3>
            </NavItem>
          </Link>
          <Link to='/subscribers'>
            <NavItem>
              <StyledIcon name='users' />
              <h3>Subscribers</h3>
            </NavItem>
          </Link>
          <Link to='/editor'>
            <NavItem>
              <StyledIcon name='mail' />
              <h3>Email Editor</h3>
            </NavItem>
          </Link>
          <Link to='/admin'>
            <NavItem>
              <StyledIcon name='chess king' />
              <h3>Admin</h3>
            </NavItem>
          </Link>
          <Link to='/profile'>
            <NavItem>
              <StyledIcon name='user' />
              <h3>Profile</h3>
            </NavItem>
          </Link>
        </Navigation>
        <BottomBanner>
          <Button title='Log Out' primary={false} handleClick={this.onLogout} />
        </BottomBanner>
      </StyledSidePanel>
    );
  }
}

const StyledSidePanel = styled.div`
  width: 250px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.primary};
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

const StyledIcon = styled(Icon)`
  font-size: 1.3em !important;
  padding-right: 30px;
`;

const Banner = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.secondary};
  justify-content: center;
  align-items: center;
  h3 {
    padding-top: 10px;
    color: ${colors.primary};
  }
`;

const BottomBanner = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  margin-top: auto;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const Navigation = styled.div`
  width: 100%;
`;

const NavItem = styled.div`
  color: ${colors.secondary};
  padding: 20px;
  width: inherit;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${colors.primaryAccent};
    transition: background-color 100ms linear;
  }
`;

const Avatar = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid red;
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

export default connect()(SidePanel);
