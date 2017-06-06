import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../Checkbox';

describe('<Checkbox>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const wrapper = shallow(
      <Checkbox
        htmlFor="some-label"
        label="Some Label"
        checked
      />
    );
    expect(
      wrapper.find('input[type="checkbox"]').prop('checked')
    ).toEqual(true);
  });

  it('calls the onChange callback when the input changes', () => {
    const onChangeCallback = jest.fn();

    const wrapper = shallow(
      <Checkbox
        htmlFor="some-label"
        label="Some Label"
        onChange={onChangeCallback}
        value="a"
      />
    );
    wrapper.find('input[type="checkbox"]').simulate(
      'change',
      {
        target: {
          value: 'a'
        }
      }
    );
    const firstArgument = onChangeCallback.mock.calls[0][0];
    expect(firstArgument.target.value).toBe('a');
  });
});
