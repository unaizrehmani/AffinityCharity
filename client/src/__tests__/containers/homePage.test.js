import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HomePageContainer } from '../../containers/homePage.js';

const mockStore = configureStore();

// Enzyme example
describe('Testing HomePage UI', () => {
  let fakeCauses = [
    {
      donors: [
        {
          causes: ['5dab3e297f1a0b006b7a36f6'],
          _id: '5db78d154a63eb006be56bcf',
          firstName: 'Zarif',
          lastName: 'Shahriar',
          email: 'zshah011@uottawa.ca',
          phone: '6138624299',
          address: '366 Oaklawn Crescent',
          createdDate: '2019-10-29T00:51:33.968Z'
        },
        {
          causes: ['5dab3e297f1a0b006b7a36f6'],
          _id: '5db08fc41edd3e006bf674d7',
          firstName: 'Ibrahim',
          lastName: 'Rehmani',
          email: 'unaizrehmani@gmail.com',
          phone: '6138624299',
          address: '366 Oaklawn Crescent',
          createdDate: '2019-10-23T17:37:08.034Z'
        }
      ],
      _id: '5dab3e297f1a0b006b7a36f6',
      name: 'Zakat',
      location: 'Global',
      deleteable: false,
      description: 'Zakat Global Fund',
      createdDate: '2019-10-19T16:47:37.990Z',
      imageID: 'production/causes/tkrd2ztab8fr7qi4ccod',
      mediaURL:
        'http://res.cloudinary.com/dmkd2a8op/image/upload/v1571505232/production/causes/tkrd2ztab8fr7qi4ccod.jpg'
    }
  ];
  const wrap = shallow(
    <HomePageContainer store={mockStore({ session: {} })} />
  );
  wrap.setState({ causes: fakeCauses });
  it('renders without crashing', () => {
    expect(wrap.exists());
  });
});
