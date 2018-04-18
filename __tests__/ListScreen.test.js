import 'react-native';
import React from 'react';
import ListScreen from '../src/Screens/ListScreen';
import renderer from 'react-test-renderer';
require('bezier');

it('renders correctly', () => {
  const tree = renderer
  .create(<ListScreen />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
