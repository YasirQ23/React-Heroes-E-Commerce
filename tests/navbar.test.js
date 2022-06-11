import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from '../src/component/Navbar.js';

describe('<Navbar />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<Navbar />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });