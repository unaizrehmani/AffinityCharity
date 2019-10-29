import React from 'react';
import { shallow } from 'enzyme';
import CauseCard from '../../components/causeCard';

const causeCard = shallow (<CauseCard />)
describe('testing the cause card', () => {
    it('renders without crashing', () => {
        causeCard
    })

    it('updates state correctly on click', () => {
        causeCard.instance().handleClick()
        expect(causeCard.state('redirect')).toEqual(true)
    })
});