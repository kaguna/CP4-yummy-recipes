import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ChangePassword from '../components/users/ChangePassword';

describe('Change password component', () => {
  const wrapper = shallow(<ChangePassword />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});