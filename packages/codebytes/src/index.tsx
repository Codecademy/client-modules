import React, { useState } from 'react';

import type { languageOption } from './consts';
import { Editor } from './editor';

interface CodeByteEditorProps {
  language?: languageOption;
  text?: string;
  hideCopyButton?: boolean;
  onCopy?: (text: string, language: string) => void;
}

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language,
  hideCopyButton = false,
  onCopy,
}) => {
  const [text, setText] = useState<string>(initialText ?? '');
  return (
    <>
      <>
        {language ? (
          <Editor
            language={language}
            text={text}
            hideCopyButton={hideCopyButton}
            onChange={(newText: string) => {
              setText(newText);
            }}
            onCopy={onCopy}
          />
        ) : (
          <div>Language</div>
        )}
      </>
    </>
  );
};

export default CodeByteEditor;
