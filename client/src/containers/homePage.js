import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';
import CauseCard from '../components/causeCard';
import { getCauses } from '../redux/actions/cause';
import { Header } from 'semantic-ui-react';

export class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(getCauses());
  };

  renderCauseCard = cause => {
    let query = this.state.query.toLowerCase();

    if (
      query !== '' &&
      cause.name.toLowerCase().indexOf(query) === -1 &&
      cause.description.toLowerCase().indexOf(query) === -1
    ) {
      return null;
    }

    return (
      <CauseCard
        key={cause._id}
        id={cause._id}
        title={cause.name}
        image={cause.mediaURL}
        date={cause.createdDate}
        location={cause.location}
        description={cause.description}
        subscribers={cause.donors ? cause.donors.length : 0}
      />
    );
  };

  onQueryChange = e => {
    const query = e.target.value;
    this.setState({
      query: query
    });
  };

  render() {
    let renderCards = this.props.causes.map(cause => {
      return this.renderCauseCard(cause);
    });

    return (
      <Container>
        <HeaderStyle>
          <Header>
            <h2 className="ui center aligned icon header">
              <i className="circular icon home"> </i>
              Dashboard
            </h2>
          </Header>
        </HeaderStyle>
        <SearchContainer>
          <Input
            id="input-search"
            name="searchBar"
            icon="search"
            size="large"
            placeholder="Search for a cause..."
            type={'text'}
            onChange={this.onQueryChange}
          />
          <Link to="/createcause">
            <Button id="button-createCause" title="Create Cause" primary />
          </Link>
        </SearchContainer>
        <PinnedCauses>
          <CausesContainer>
            {this.props.isGettingCauses ? (
              <i className="red massive notched circle loading icon"></i>
            ) : (
              renderCards
            )}
          </CausesContainer>
        </PinnedCauses>
      </Container>
    );
  }
}

const HeaderStyle = styled.div`
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CausesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SearchContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
`;

const PinnedCauses = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
`;

// export default HomePage;
const mapStateToProps = state => ({
  session: state.authentication,
  isGettingCauses: state.cause.isGettingCauses,
  causes: state.cause.causes
});

export const HomePage = connect(mapStateToProps)(HomePageContainer);
