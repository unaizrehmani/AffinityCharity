import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HomePageContainer } from '../../containers/homePage.js';
import CauseCard from '../../components/causeCard';
import Input from '../../components/input';
import Button from '../../components/button';

const mockStore = configureStore();

// Test Suite
describe('HomePage UI', () => {
  //Fake user session
  const session = {
    isLoggedIn: true,
    email: 'zshah011@uottawa.ca',
    firstName: 'Zarif',
    lastName: 'Shahriar',
    isAdmin: true,
    userToken: 'exampleToken'
  };

  it('renders without crashing', () => {
    const wrap = shallow(
      <HomePageContainer store={mockStore({ session: session })} />
    );
    expect(wrap.exists());
  });
});
