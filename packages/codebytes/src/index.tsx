import React, { useState } from 'react';

import { languageOption } from './consts';
import { Editor } from './editor';

export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
}

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language,
  hideCopyButton,
}) => {
  const [text, setText] = useState<string>(initialText);
  return (
    <>
      <Editor
        text={text}
        onChange={(newText: string) => {
          setText(newText);
        }}
        hideCopyButton={hideCopyButton}
        language={language}
      />
    </>
  );
};

export default CodeByteEditor;
