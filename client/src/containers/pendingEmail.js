import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EmailEditor from 'react-email-editor';
import { connect } from 'react-redux';
import Button from '../components/button';
import { Icon, Form, Message } from 'semantic-ui-react';
import MultipleEmail from '../components/multipleEmail';

const { URL } = require('../util/baseURL');

class PendingEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      emailID: '',
      subject: '',
      emails: [],
      error: false,
      success: false,
      loading: false,
      design: {}
    };
  }

  checkForUnapprovedEmails = () => {
    axios
      .get(`${URL}/api/email/unapproved`, {
        headers: { Authorization: 'Bearer ' + this.props.session.userToken }
      })
      .then(result => {
        const { data } = result;
        if (data && data.length > 0) {
          const currData = data[0];
          this.setState(
            {
              data,
              emailID: currData._id,
              emails: currData.donorEmails,
              subject: currData.subject,
              design: currData.editorJSON
            },
            () => {
              if (window.unlayer && this.state.design) {
                window.unlayer.loadDesign({...this.state.design});

              }
            }
          );
          return true;
        } else {
          this.setState({
            data: []
          });
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };

  componentDidMount = async () => {
    if(this.props.session.isAdmin) {
      this.checkForUnapprovedEmails();
    }
  };

  onLoad = () => {
    window.unlayer.loadDesign(this.state.design);
  };

  renderNoEmailsMessage = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        There are no more emails to approve!
      </div>
    );
  };

  exportHtml = () => {
    this.setState({ loading: true });
    window.unlayer.exportHtml(data => {
      const config = {
        headers: { Authorization: `Bearer ${this.props.session.userToken}` }
      };
      const html = `${String(data.html)}`;
      const email = this.state.emails;
      const subject = this.state.subject;
      const emailID = this.state.emailID;

      if (email != null && email.length > 0) {
        const bodyParameters = {
          html,
          email,
          subject,
          emailID
        };

        axios
          .patch(`${URL}/api/email/approved`, bodyParameters, config)
          .then(() => {
            this.setState({
              loading: false,
              success: true,
              error: false,
              statusMessage: 'Email successfully sent!'
            });
            this.checkForUnapprovedEmails();
          })
          .catch(error => {
            console.log(error);
            this.setState({
              loading: false,
              success: false,
              error: true,
              statusMessage: 'Server error: Please contact tech support'
            });
          });
      } else {
        this.setState({
          loading: false,
          success: false,
          error: true,
          statusMessage: 'Please add some emails in "Bcc:" field'
        });
      }
    });
  };

  updateEmails = emails => {
    this.setState({ emails });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  renderEmailEditor = () => {
    return (
      <Form
        loading={this.state.loading}
        error={this.state.error}
        success={this.state.success}
      >
        <Form.Input
          type="text"
          name="subject"
          value={this.state.subject}
          onChange={this.handleUserInput}
          label="Subject"
          placeholder="Enter email subject"
        />
        <MultipleEmailStyle>
          <MultipleEmail
            label="Bcc:"
            emails={this.state.emails}
            updateEmails={this.updateEmails}
          />
        </MultipleEmailStyle>
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
          onLoad={() => {
            if (this.state.data.length > 0) {
              this.onLoad();
            }
          }}
        />
        <Message error header={this.state.statusMessage} />
        <Message success header={this.state.statusMessage} />
        <ButtonStyle>
          <Button primary handleClick={this.exportHtml}>
            <Icon name="check"></Icon>
            Approve Email
          </Button>
        </ButtonStyle>
      </Form>
    );
  };

  renderNotAdmin = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        You are not authorized to approve pending emails
      </div>
    );
  };

  renderForAdmin = () => {
    if (this.props.session.isAdmin) {
      return (
        <EmailerStyle>
          {this.state.data.length > 0
            ? this.renderEmailEditor()
            : this.renderNoEmailsMessage()}
        </EmailerStyle>
      );
    } else {
      return this.renderNotAdmin();
    }
  };

  render = () => {
    return (
      <div style={{ padding: '20px' }}>
        <Header>
          <h2 className="ui center aligned icon header">
            <i className="circular icon envelope"> </i>
            Pending Emails
          </h2>
        </Header>
        {this.renderForAdmin()}
      </div>
    );
  };
}

const Header = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const EmailerStyle = styled.div`
  width: 100%;
  padding: 20px;
`;

const ButtonStyle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const MultipleEmailStyle = styled.div`
  padding-top: 5px;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(PendingEmail);
