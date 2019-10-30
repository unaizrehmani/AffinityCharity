import React from 'react';
import { shallow } from 'enzyme';
import CauseCard from '../../components/causeCard';

describe('testing the cause card', () => {
  it('renders without crashing', () => {
    shallow(<CauseCard />);
  });

  it('updates state correctly on click', () => {
    const wrapper = shallow(<CauseCard />)
    wrapper.instance().handleClick();
    expect(wrapper.state('redirect')).toEqual(true);
  });
});
