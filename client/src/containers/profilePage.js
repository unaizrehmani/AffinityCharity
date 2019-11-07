import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ProfileForm from '../components/profileForm';

class ProfilePage extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header as="h2" textAlign="center">
            <Icon name="settings" />
            <Header.Content>
              Profile Settings
              <Header.Subheader>Manage your preferences</Header.Subheader>
            </Header.Content>
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
