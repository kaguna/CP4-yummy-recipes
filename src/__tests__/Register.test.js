import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Register from '../components/users/Register';

describe('Register component', () => {
  const wrapper = shallow(<Register />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('has divs', () => {
    expect(wrapper.find('div')).toHaveLength(18);
  });
});
