import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateCausePageContainer } from '../../containers/createCausePage';

const wrapper = shallow(<CreateCausePageContainer />)
//const createCausePage = shallow (<CreateCausePage />)
describe('testing the createCausePage', () => {
    it('renders without crashing', () => {
        wrapper
    })

    it('renders full page without crashing', () => {
        mount(<CreateCausePageContainer />)
    })

    it('handles user input', () => {

    })
});