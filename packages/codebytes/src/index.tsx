import React from 'react';

import type { CopyButtonMode, languageOption } from './consts';
import { Editor } from './editor';

interface CodeByteEditorProps {
  language?: languageOption;
  text?: string;
  copyButtonMode?: CopyButtonMode;
}

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language,
  copyButtonMode,
}) => {
  const [text, setText] = useState<string>(initialText ?? '');
  return (
    <>
      <>
        {language ? (
          <Editor
            language={language}
            text={text}
            copyButtonMode={copyButtonMode}
            onChange={(newText: string) => {
              setText(newText);
            }}
          />
        ) : (
          <div>Language</div>
        )}
      </>
    </>
  );
};

export default CodeByteEditor;
