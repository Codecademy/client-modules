import React, { useState } from 'react';

import { Editor } from './editor';

export interface CodeByteEditorProps {
  text: string;
  renderMode: boolean;
}

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  renderMode,
}) => {
  const [text, setText] = useState<string>(initialText);

  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  return (
    <>
      <Editor
        text={text}
        onChange={(newText: string) => {
          setText(newText);
          if (!renderMode && hasBeenEdited === false) {
            setHasBeenEdited(true);
          }
        }}
      />
    </>
  );
};

export default CodeByteEditor;
