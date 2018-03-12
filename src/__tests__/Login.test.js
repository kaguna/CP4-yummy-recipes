import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Login from '../components/users/Login';

describe('Login component', () => {
  const wrapper = shallow(<Login />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().loginHandler({ preventDefault }));
  });
})