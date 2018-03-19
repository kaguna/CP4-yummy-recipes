import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ToasterSuccess from '../common/ToasterSuccess';

describe('Toast success component', () => {
  const wrapper = shallow(<ToasterSuccess />);

  it('renders properly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
