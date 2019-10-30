import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

// Enzyme example
describe('Application', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
