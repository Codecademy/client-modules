import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CodeByteEditor } from '../index';

/* IMPORTANT: The CodeByteEditor is currently being migrated to client-modules. The current component is a work in progress, and does not represent the fully functioning CodeByteEditor component. */

export default {
  title: 'Example/CodeByteEditor',
  component: CodeByteEditor,
} as ComponentMeta<typeof CodeByteEditor>;

const Template: ComponentStory<typeof CodeByteEditor> = (args) => (
  <CodeByteEditor {...args} />
);

export const Default = Template.bind({});
Default.args = { text: 'hi' };
