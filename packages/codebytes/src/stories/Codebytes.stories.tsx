import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CodeByteEditor } from '../index';

export default {
  title: 'Example/Codebytes',
  component: CodeByteEditor,
} as ComponentMeta<typeof CodeByteEditor>;

const Template: ComponentStory<typeof CodeByteEditor> = (args) => (
  <CodeByteEditor {...args} />
);

export const Default = Template.bind({});
Default.args = { text: 'hi' };
