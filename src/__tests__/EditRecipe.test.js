import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import EditRecipe from '../components/recipes/EditRecipe';

describe('Edit recipes component', () => {
  const props = {
    recipe: { category_id: 1,
      recipe_description: 'fghbjnk',
      recipe_name: 'cool stuff' },
  };
  const wrapper = shallow(<EditRecipe {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
