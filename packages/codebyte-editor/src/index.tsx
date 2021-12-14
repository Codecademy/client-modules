import React, { useState } from 'react';

import { Editor } from './editor';

export interface CodeByteEditorProps {
  text: string;
}

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
}) => {
  const [text, setText] = useState<string>(initialText);
  return (
    <>
      <Editor
        text={text}
        onChange={(newText: string) => {
          setText(newText);
        }}
      />
    </>
  );
};

export default CodeByteEditor;
