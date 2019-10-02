import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import ProfilePic from '../images/profilePic.jpeg';
import CircularImage from '../components/circularImage';
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
          <CircularImage image='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.realsimple.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Frs_medium_image%2Fpublic%2Fwoman-no-makeup.jpg%3Fitok%3Drqo_zfOM&q=85' />
          <StyledBannerInfo>
            <h3>Jane Doe</h3>
            <h3>Charity </h3>
          </StyledBannerInfo>
        </Banner>
        <Navigation onClick={this.props.toggle}>
          <NavItem>
            <Icon name='home' />
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

const Banner = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

const StyledBannerInfo = styled.div`
  text-align: center;
  h3 {
    margin: 0;
  }
`;

const BottomBanner = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  margin-top: auto;
  align-items: center;
`;

const Navigation = styled.div``;

const NavItem = styled.div`
  background: ${colors.primaryAccent};
  color: ${colors.secondary};
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

export default connect()(SidePanel);
