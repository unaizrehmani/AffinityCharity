import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';
import colors from '../styles/colors';
import CauseCard from '../components/causeCard';
import axios from '../../node_modules/axios/index';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      causes: []
    };
  }

  componentDidMount = async () => {
    try {
      const result = await axios.get(
        'https://social-charity-server.herokuapp.com/api/causes'
      );
      this.setState({ causes: result.data });
    } catch (err) {
      console.log(err);
    }
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
        title={cause.name}
        image={cause.mediaURL}
        date={cause.createdDate}
        location={cause.location}
        description={cause.description}
        subscribers={cause.donors.length}
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
    return (
      <HomePageContainer>
        <Header>
          <h1>Dashboard</h1>
          <hr />
        </Header>
        <SearchContainer>
          <Input
            icon="search"
            placeholder="Search for a cause.."
            type={'text'}
            onChange={this.onQueryChange}
          />
          <Link to="/createcause">
            <Button title="Create Cause" primary />
          </Link>
        </SearchContainer>
        <PinnedCauses>
          <h3>Pinned Causes</h3>
          <CausesContainer>
            {/* TODO: Add a spinner container while this.state.causes is empty */}
            {this.state.causes.map(cause => {
              return this.renderCauseCard(cause);
            })}
          </CausesContainer>
        </PinnedCauses>
      </HomePageContainer>
    );
  }
}

const HomePageContainer = styled.div`
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  margin-bottom: 20px;
  margin-top: 50px;
  h1 {
    font-size: 40px !important;
  }
  hr {
    height: 0.2rem;
    width: 80%;
    background: ${colors.primary};
    border: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.2rem;
  }
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
  session: state.authentication
});

export default connect(mapStateToProps)(HomePage);
