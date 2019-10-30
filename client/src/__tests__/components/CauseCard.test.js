import React from 'react';
import { shallow } from 'enzyme';
import CauseCard from '../../components/causeCard';

const wrapper = shallow(<CauseCard />);
describe('testing the cause card', () => {
  it('renders without crashing', () => {
    wrapper;
  });

  it('updates state correctly on click', () => {
    wrapper.instance().handleClick();
    expect(wrapper.state('redirect')).toEqual(true);
  });
});
