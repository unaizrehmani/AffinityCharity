import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import CircularImage from '../components/circularImage';
import Button from '../components/button';
import PostCard from '../components/postCard';
import { Redirect } from 'react-router-dom';
import { getEmails } from '../redux/actions/email';

class CausePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      causeId: this.props.match.params.id,
      cause: null,
      redirect: false
    };
  }

  componentDidMount() {
    const cause = this.props.causes.find(
      cause => cause._id === this.state.causeId
    );
    this.setState({
      cause: cause
    });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  renderCausePage = () => {
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
              title="Create Post"
              primary
              handleClick={this.handleClick}
            ></Button>
            <Button title="Edit Cause" primary></Button>
          </ButtonWrapper>
        </CauseBanner>
        <CauseContent>
          {/* <PostCard />
          <Separator /> */}
        </CauseContent>
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

const Separator = styled.div`
  margin: 10px 0px;
  height: 50px;
  width: 3px;
  background-color: ${colors.primaryAccent};
`;

const mapStateToProps = state => ({
  session: state.authentication,
  causes: state.cause.causes,
  isGettingEmails: state.email.isGettingEmails,
  emails: state.email.emails
});

export default connect(mapStateToProps)(CausePage);
