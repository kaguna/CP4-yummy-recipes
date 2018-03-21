import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ViewProcedure from '../components/recipes/ViewProcedure';

describe('view procedure modal component', () => {
  const props = {
    recipe: { category_id: 1,
      recipe_description: 'fghbjnk',
      recipe_name: 'cool stuff' },
  };
  const wrapper = shallow(<ViewProcedure {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
