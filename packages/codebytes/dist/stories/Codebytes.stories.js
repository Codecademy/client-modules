import React from 'react';
import { CodeByteEditor } from '../index';
export default {
  title: 'Example/Codebytes',
  component: CodeByteEditor
};

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(CodeByteEditor, args);
};

export var Default = Template.bind({});
Default.args = {
  text: 'hi'
};