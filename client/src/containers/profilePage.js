import React, { Component } from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ProfileForm from '../components/profileForm';

class ProfilePage extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>
            <h2 className="ui center aligned icon header">
              <i className="circular icon settings"> </i>
              Profile
            </h2>
          </Header>
        </HeaderContainer>
        <ProfileForm session={this.props.session} />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  margin-bottom: 20px;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(ProfilePage);
