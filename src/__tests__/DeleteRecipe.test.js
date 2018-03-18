import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeleteRecipe from '../components/recipes/DeleteRecipe';

describe('Edit recipes component', () => {
  const props = {
    recipe: { category_id: 1,
      recipe_description: 'fghbjnk',
      recipe_name: 'cool stuff',
      recipeId: 1 },
  };
  const wrapper = shallow(<DeleteRecipe {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
