import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';
import colors from '../styles/colors';
import CauseCard from '../components/causeCard';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // For testing populate fakeCauses object.
    this.state = {
      query: '',
      fakeCauses: [
        {
          id: '1',
          name: 'Jane Doe',
          image:
            'https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038',
          description: 'Insert short description.',
          date: 'June 30th, 2008',
          subscribers: 25
        },
        {
          id: '2',
          name: 'Shefali Jane',
          image:
            'https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038',
          description: 'Insert short description.',
          date: 'June 30th, 2008',
          subscribers: 25
        }
      ]
    };
  }

  // Pass in a cause from list of causes
  renderCauseCard = cause => {
    let query = this.state.query.toLowerCase();

    // If query is not empty and it's not within the name of the cause, exclude it.
    if (query !== '' && cause.name.toLowerCase().indexOf(query) === -1) {
      return null;
    }

    // Make sure this matches what DB sends back for cause object
    return (
      <CauseCard
        key={cause.id}
        title={cause.name}
        image={cause.image}
        date={cause.date}
        description={cause.description}
        subscribers={cause.subscribers}
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
          <h1>DASHBOARD</h1>
        </Header>
        <SearchContainer>
          <Input
            icon='search'
            placeholder='Search for a cause..'
            type={'text'}
            onChange={this.onQueryChange}
          />
        </SearchContainer>
        <CausesContainer>
          {this.state.fakeCauses.map(cause => {
            return this.renderCauseCard(cause);
          })}
        </CausesContainer>
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
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${colors.primaryAccent};
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.background};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  hr {
    height: 0.2rem;
    width: 200px;
    background: ${colors.background};
    border: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.2rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 10px;
`;

// export default HomePage;
const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(HomePage);
