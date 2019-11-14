import React, { Component } from 'react';
import EmailEditor from 'react-email-editor';
import styled from 'styled-components';
import axios from 'axios';
import MultipleEmail from '../components/multipleEmail';
import { Icon, Button, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
const { URL } = require('../util/baseURL');
class Emailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      subject: '',
      error: false,
      success: false,
      statusMessage: '',
      loading: false
    };
  }
  updateEmails = emails => {
    this.setState({ emails });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios
      .get(`${URL}/api/causes/${id}`, {
        headers: { Authorization: 'Bearer ' + this.props.session.userToken }
      })
      .then(result => {
        const cause = result.data;
        const emails = cause.donors.map(x => x.email);
        const subject = `${cause.name} - ${cause.location}`;
        this.setState({ emails, subject });
      })
      .catch(err => {
        console.log(err);
      });
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

      if (email != null && email.length > 0) {
        const bodyParameters = {
          html,
          email,
          subject
        };

        axios
          .post(`${URL}/api/causes/send-email`, bodyParameters, config)
          .then(() => {
            this.setState({
              loading: false,
              success: true,
              error: false,
              statusMessage: 'Email successfully sent!'
            });
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

  saveDesign = () => {
    this.setState({ loading: true });
    window.unlayer.saveDesign(design => {
      const { id } = this.props.match.params;
      axios
        .patch(
          `${URL}/api/causes/${id}`,
          {
            defaultDesign: design
          },
          {
            headers: { Authorization: 'Bearer ' + this.props.session.userToken }
          }
        )
        .then(() => {
          this.setState({
            loading: false,
            success: true,
            error: false,
            statusMessage: 'You have successfully saved the E-mail template'
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            success: false,
            error: true,
            statusMessage: 'Server error: Please contact tech support'
          });
        });
    });
  };

  onLoad = () => {
    const { id } = this.props.match.params;
    axios
      .get(`${URL}/api/causes/${id}`, {
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
      <EmailerStyle>
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
            style={{
              position: 'relative'
            }}
            appearance={{
              theme: 'light'
            }}
            onLoad={this.onLoad}
          />

          <ButtonStyle>
            <Button primary onClick={this.exportHtml}>
              <Icon name="send"></Icon>
              Send Email
            </Button>
            <Button primary onClick={this.saveDesign}>
              <Icon name="save"></Icon>
              Save Email
            </Button>
          </ButtonStyle>
          <Message error header={this.state.statusMessage} />
          <Message success header={this.state.statusMessage} />
        </Form>
      </EmailerStyle>
    );
  };
}
const EmailerStyle = styled.div`
  width: 100%;
  padding: 20px;
`;

const MultipleEmailStyle = styled.div`
  padding-top: 5px;
`;

const ButtonStyle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(Emailer);
