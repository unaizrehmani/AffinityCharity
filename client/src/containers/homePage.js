import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import colors from '../styles/colors';
import CauseCard from '../components/causeCard';
import NewCauseCard from '../components/newCauseCard';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // For testing populate fakeCauses object.
    this.state = {
      query: '',
      fakeCauses: [
        {
          name: 'Jane Doe',
          image:
            'https://i1.wp.com/haitiorphanfoundation.com/wp-content/uploads/2018/02/Homepage-Cutout.png?zoom=2&fit=956%2C1038',
          description: 'Insert short description.',
          date: 'June 30th, 2008',
          subscribers: 25
        },
        {
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
    const { query } = this.state;

    // If query is not empty and it's not within the name of the cause, exclude it.
    if (
      query !== '' &&
      cause.name.toLowerCase().indexOf(query.toLowerCase()) === -1
    ) {
      return null;
    }

    // Make sure this matches what DB sends back for cause object
    return (
      <CauseCard
        title={cause.name}
        image={cause.image}
        date={cause.date}
        description={cause.description}
        subscribers={cause.subscribers}
      />
    );
  };

  render() {
    return (
      <HomePageContainer>
        <Header>
          <h1>Dashboard</h1>
          <hr />
        </Header>
        <CausesContainer>
          {this.state.fakeCauses.map(cause => {
            return this.renderCauseCard(cause);
          })}
        </CausesContainer>
      </HomePageContainer>
    );
  }
}
// export default HomePage;
const mapStateToProps = state => ({
  session: state.authentication
});

const HomePageContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CausesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Header = styled.div`
  text-align: center;
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

export default connect(mapStateToProps)(HomePage);
