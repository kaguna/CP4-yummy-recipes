import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AxiosInstance from '../common/AxiosInstance';

describe('AxiosInstance component', () => {
  const wrapper = shallow(<AxiosInstance />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
