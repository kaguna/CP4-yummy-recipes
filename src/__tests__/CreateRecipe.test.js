import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CreateRecipe from '../components/recipes/CreateRecipe';

describe('Create recipes component', () => {
  const props = { category_id: 1,
  };
  const wrapper = shallow(<CreateRecipe {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
