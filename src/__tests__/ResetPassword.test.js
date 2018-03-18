import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResetPassword from '../components/users/ResetPassword';

describe('Reset password component', () => {
  const wrapper = shallow(<ResetPassword />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});