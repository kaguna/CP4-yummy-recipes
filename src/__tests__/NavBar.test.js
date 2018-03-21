import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NavBar from '../common/NavBar';

describe('Navbarcomponent', () => {
  const wrapper = shallow(<NavBar />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
