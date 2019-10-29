import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

// Enzyme example
describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

// Jest example
const sum = (x, y) => x + y;

describe('Examining the syntax of Jest tests', () => {
  it('sums numbers', () => {
    expect(sum(1, 2)).toEqual(3);
    expect(sum(2, 2)).toEqual(4);
  });
});
