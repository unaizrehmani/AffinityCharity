import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import EmailEditor from 'react-email-editor';
import { connect } from 'react-redux';
import Button from '../components/button';

const { URL } = require('../util/baseURL');

class PendingEmail extends Component {
  onLoad = () => {
    axios
      .get(`${URL}/api/causes/5dab3e297f1a0b006b7a36f6`, {
        headers: { Authorization: 'Bearer ' + this.props.session.userToken }
      })
      .then(result => {
        const { defaultDesign } = result.data;
        window.unlayer.loadDesign(defaultDesign);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render = () => {
    return (
      <div>
        <Header>
          <h2 className="ui center aligned icon header">
            <i className="circular icon envelope"> </i>
            Pending Emails
          </h2>
        </Header>
        <EmailerStyle>
          <Container>
              <EmailEditor
                minHeight={'600px'}
                projectId={1071}
                options={{
                  customCSS: [
                    `
                      .blockbuilder-tools-panel .blockbuilder-branding {
                          display: none;
                      }
                    `
                  ]
                }}
                appearance={{
                  theme: 'light'
                }}
                onLoad={this.onLoad}
              />
              <div>
                <Button>Hello</Button>
              </div>
          </Container>
        </EmailerStyle>
      </div>
    );
  };
}

const Header = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const EmailerStyle = styled.div`
  border: 1px black solid;
  width: 100%;
  padding: 20px;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(PendingEmail);
