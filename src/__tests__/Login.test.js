import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Login from '../components/users/Login';

describe('Login component', () => {
  const wrapper = shallow(<Login />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('has divs', () => {
    expect(wrapper.find('div')).toHaveLength(14);
  });
});

