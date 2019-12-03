import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import { Icon, Modal } from 'semantic-ui-react';
import CircularImage from '../components/circularImage';
import RenderHTML from '../components/renderHTML';
import Button from '../components/button';
import { Redirect } from 'react-router-dom';
import { getUserEmail } from '../redux/actions/cause';
import { URL } from '../util/baseURL';
import axios from 'axios';

class CausePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      causeId: this.props.match.params.id,
      cause: null,
      redirect: false,
      showAgentModal: false,
      emails: [],
      loadingAgents: false,
      approvedEmails: [],
      currentHTML: '',
      showEmailModal: false
    };
  }

  componentDidMount = async () => {
    const cause = this.props.causes.find(
      cause => cause._id === this.state.causeId
    );

    // TODO: move this to redux
    try {
      const result = await axios.get(`${URL}/api/email/approved`, {
        headers: { Authorization: 'Bearer ' + this.props.session.userToken }
      });
      const { data } = result;
      const approvedEmails = data.filter(x => {
        if (x.cause && x.cause._id === this.props.match.params.id) return x;
      });
      this.setState(
        {
          approvedEmails
        },
        () => {
          console.log('approvedEmails: ', this.state.approvedEmails);
        }
      );
    } catch (err) {
      console.log(err);
    }
    this.setState({
      cause: cause,
      showAgentModal: false,
      emails: [],
      loadingAgents: false
    });
  };

  handleClickEmail = () => {
    this.setState({ redirect: true });
  };

  handleClickAgent = async () => {
    this.setState({ loadingAgents: true });
    this.setState({ showAgentModal: true });

    const userIDs = this.state.cause.users;
    let userEmails = [];
    await Promise.all(
      userIDs.map(async id => {
        let res = await this.getUserEmail(id);
        return userEmails.push(res);
      })
    );
    this.setState({
      emails: userEmails,
      loadingAgents: false
    });
  };

  getUserEmail = async userID => {
    const result = await this.props.dispatch(
      getUserEmail(userID, this.props.session.userToken)
    );
    return result.data.email;
  };

  handleCloseModal = () => {
    this.setState({ showAgentModal: false });
  };

  renderAgents = email => {
    return (
      <span key={email}>
        <br></br>
        {email}
      </span>
    );
  };

  formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  handleEmailClick = email => {
    this.setState({ currentHTML: email.html, showEmailModal: true });
  };

  renderEmails = email => {
    console.log(email);
    const audience = email.donorEmails.length;
    const date = this.formatDate(email.createdDate);
    return (
      <EmailCard key={email._id} onClick={() => this.handleEmailClick(email)}>
        <EmailDate>{date}</EmailDate>
        <p>Subject</p>
        <EmailSubject>{email.subject}</EmailSubject>
        <p>Sent To</p>
        <p>
          <Icon name="user" />
          {audience}
        </p>
      </EmailCard>
    );
  };

  renderCausePage = () => {
    let renderAgents = this.state.emails.map(email => {
      return this.renderAgents(email);
    });
    let renderContent = this.state.approvedEmails.map(email => {
      return this.renderEmails(email);
    });
    let modalContent = <RenderHTML htmlString={this.state.currentHTML} />;
    let renderModal = this.state.showEmailModal ? (
      <Modal
        open={this.state.showEmailModal}
        onClose={() => this.setState({ showEmailModal: false })}
        closeIcon={true}
      >
        <Modal.Content scrolling>{modalContent}</Modal.Content>
      </Modal>
    ) : (
      ''
    );
    return (
      <CausePageWrapper>
        <CauseBanner>
          <CircularImage
            image={this.state.cause ? this.state.cause.mediaURL : ''}
            style={{
              border: '2px solid #E35268',
              height: '200px',
              width: '200px'
            }}
          />
          <CauseTitle>
            {this.state.cause ? this.state.cause.name : ''}
          </CauseTitle>
          <CauseLocation>
            {this.state.cause ? this.state.cause.location : ''}
          </CauseLocation>
          <CircularImage
            image={
              'https://www.humanconcern.org/wp-content/uploads/2016/03/logo-body.png'
            }
            style={{ height: '50px', width: '50px' }}
          />
          <ButtonWrapper>
            <Button
              title="Create Email"
              primary
              handleClick={this.handleClickEmail}
            ></Button>
            <Button title="Edit Cause" primary></Button>
            <Button
              title="View Agents"
              primary
              handleClick={this.handleClickAgent}
              disabled={this.state.loadingAgents}
            ></Button>
          </ButtonWrapper>
          <Modal
            open={this.state.showAgentModal}
            onClose={() => this.setState({ showAgentModal: false })}
            closeIcon={true}
          >
            <Modal.Content>
              <h1>Agents</h1>
              {this.state.loadingAgents ? (
                <i className="red massive notched circle loading icon"></i>
              ) : (
                renderAgents
              )}
            </Modal.Content>
          </Modal>
        </CauseBanner>
        <EmailHeader>Email History</EmailHeader>
        <EmailContainer>
          {this.state.approvedEmails.length > 0 ? (
            renderContent
          ) : (
            <div>No posts have ever been made</div>
          )}
        </EmailContainer>
        {renderModal}
      </CausePageWrapper>
    );
  };

  render() {
    return this.state.redirect ? (
      <Redirect push to={'/editor/' + this.state.causeId} />
    ) : (
      this.renderCausePage()
    );
  }
}

const CausePageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CauseBanner = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: ${colors.primary};
  color: ${colors.background};
  align-items: center;
  text-align: center;
`;

const CauseTitle = styled.h1`
  margin: 0px;
`;
const CauseLocation = styled.h5`
  margin: 0px;
  font-weight: 100;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const EmailHeader = styled.h2`
  margin-top: 20px !important;
  text-align: center;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;

const EmailCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 140px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: ${colors.primary};
  background-color: ${colors.secondary};
  cursor: pointer;
  box-shadow: 0px 0px 3px 0px rgba(173, 173, 173, 1);
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 0px 5px 25px 0px rgba(173, 173, 173, 1);
  }
`;

const EmailDate = styled.p`
  font-weight: bold !important;
  margin-bottom: 5px !important;
`;

const EmailSubject = styled.h3`
  font-size: 18px !important;
  margin-bottom: 5px !important;
`;

const mapStateToProps = state => ({
  session: state.authentication,
  causes: state.cause.causes,
  isGettingEmails: state.email.isGettingEmails,
  emails: state.email.emails
});

export default connect(mapStateToProps)(CausePage);
