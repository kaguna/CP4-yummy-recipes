import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CreateCategory from '../components/categories/CreateCategory';

describe('Create category component', () => {
  const wrapper = shallow(<CreateCategory />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
