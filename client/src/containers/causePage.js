import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import CircularImage from '../components/circularImage';
import Button from '../components/button';
import { Redirect } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { getUserEmail } from '../redux/actions/cause';

class CausePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      causeId: this.props.match.params.id,
      cause: null,
      redirect: false,
      showModal: false,
      emails: [],
      loadingAgents: false
    };
  }

  componentDidMount() {
    const cause = this.props.causes.find(
      cause => cause._id === this.state.causeId
    );

    this.setState({
      cause: cause,
      showModal: false,
      emails: [],
      loadingAgents: false
    });

    // this.handleClickAgent();
  }

  handleClickEmail = () => {
    this.setState({ redirect: true });
  };

  handleClickAgent = async () => {
    this.setState({ loadingAgents: true });
    this.setState({ showModal: true });

    const userIDs = this.state.cause.users;
    console.log('USER IDS:', userIDs);
    let userEmails = [];
    console.log('BEGINNING LOOP');
    await Promise.all(
      userIDs.map(async id => {
        // await this.getUserEmail(id).then( res => {
        //   console.log('Got a email!', res);
        //   userEmails.push(res);
        // });
        let res = await this.getUserEmail(id);
        console.log('Got a email!', res);
        return userEmails.push(res);
      })
    );
    console.log('FINISHED LOOP');
    console.log(userEmails);
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
    this.setState({ showModal: false });
  };

  renderAgents = email => {
    return (
      <span key={email}>
        <br></br>
        {email}
      </span>
    );
  };

  renderCausePage = () => {
    let renderAgents = this.state.emails.map(email => {
      return this.renderAgents(email);
    });
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
            open={this.state.showModal}
            onClose={() => this.setState({ showModal: false })}
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
        <CauseContent>{/* Email History Here*/}</CauseContent>
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

const CauseContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

// const Separator = styled.div`
//   margin: 10px 0px;
//   height: 50px;
//   width: 3px;
//   background-color: ${colors.primaryAccent};
// `;

const mapStateToProps = state => ({
  session: state.authentication,
  causes: state.cause.causes,
  isGettingEmails: state.email.isGettingEmails,
  emails: state.email.emails
});

export default connect(mapStateToProps)(CausePage);
