import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateCausePageContainer } from '../../containers/createCausePage';

describe('Testing the CreateCausePage', () => {
  it('renders without crashing', () => {
    shallow(<CreateCausePageContainer />);
  });

  it('renders full page without crashing', () => {
    mount(<CreateCausePageContainer />);
  });

  it('renders input for name', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    expect(wrapper.find('#input-name').length).toEqual(1);
  });

  it('renders input for location', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    expect(wrapper.find('#input-location').length).toEqual(1);
  });

  it('renders input for description', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    expect(wrapper.find('#input-description').length).toEqual(1);
  });

  it('renders input for image', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    expect(wrapper.find('#input-image').length).toEqual(1);
  });

  it('renders button for creating cause', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    expect(wrapper.find('#button-createCause').length).toEqual(1);
  });
});

describe('name input', () => {
  it('should respond to change event and change the state accordingly', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    wrapper
      .find('#input-name')
      .simulate('change', { target: { name: 'name', value: 'foo' } });
    expect(wrapper.state('name')).toEqual('foo');
  });
});

describe('location input', () => {
  it('should respond to change event and change the state accordingly', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    wrapper
      .find('#input-location')
      .simulate('change', { target: { name: 'location', value: 'foo' } });
    expect(wrapper.state('location')).toEqual('foo');
  });
});

describe('description input', () => {
  it('should respond to change event and change the state accordingly', () => {
    const wrapper = shallow(<CreateCausePageContainer />);
    wrapper
      .find('#input-description')
      .simulate('change', { target: { name: 'description', value: 'foo' } });
    expect(wrapper.state('description')).toEqual('foo');
  });
});

// describe('image input', () => {
//   it('should respond to change event and change the state accordingly', () => {
//     const wrapper = shallow(<CreateCausePageContainer />);
//     wrapper
//       .find('#input-image')
//       .simulate('change', { target: { name: 'image', value: 'foo' } });
//     expect(wrapper.state('image')).toEqual('foo');
//   });
// });
