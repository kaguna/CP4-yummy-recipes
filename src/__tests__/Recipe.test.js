import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Recipes from '../components/recipes/Recipes';

describe('All the recipes component', () => {
  const props = {
    match: {
      params: { category_id: 1 } },
  };
  const wrapper = shallow(<Recipes {...props} />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
