import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { languageOption } from './consts';
import { Editor } from './editor';

export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
  onCopy?: (text: string, language: string) => void;
}

const EditorContainer = styled(Background)(
  system.css({
    border: '1',
    borderColor: 'gray-900',
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    width: '688px',
    overflow: 'hidden',
  })
);

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language,
  hideCopyButton,
  onCopy,
}) => {
  const [text, setText] = useState<string>(initialText);
  return (
    <>
      <EditorContainer bg="black" as="main">
        <Box borderBottom="1" borderColor="gray-900" py="4" pl="8">
          <IconButton
            icon={FaviconIcon}
            variant="secondary"
            href="https://www.codecademy.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="visit codecademy.com"
          />
        </Box>
        <Editor
          language={language}
          text={text}
          hideCopyButton={hideCopyButton}
          onChange={(newText: string) => {
            setText(newText);
          }}
          onCopy={onCopy}
        />
      </EditorContainer>
    </>
  );
};

export default CodeByteEditor;
