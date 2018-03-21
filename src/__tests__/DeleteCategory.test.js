// This file tests the delete component with its properties.
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeleteCategory from '../components/categories/DeleteCategory';

describe('Delete category component', () => {
  const props = {
    category: { category_name: 'muthere' },
  };
  const wrapper = shallow(<DeleteCategory {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
