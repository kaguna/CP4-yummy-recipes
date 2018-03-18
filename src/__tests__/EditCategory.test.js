// This file tests category editing with the properties.
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import EditCategory from '../components/categories/EditCategory';

describe('Login component', () => {
  const props = {
    category: { category_name: 'muthere' },
  };
  const wrapper = shallow(<EditCategory {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
