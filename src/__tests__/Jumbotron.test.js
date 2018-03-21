import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Jumbotron from '../common/Jumbotron';

describe('Landing page component', () => {
  const wrapper = shallow(<Jumbotron />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
