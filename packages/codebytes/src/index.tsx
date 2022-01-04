import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, states, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { languageOption } from './consts';
import { Editor } from './editor';

export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
  onCopy?: (text: string, language: string) => void;
  isIFrame?: boolean;
  snippetsBaseUrl?: string /* TODO in DISC-353: Determine best way to host and include snippets endpoint for both staging and production in both the monolith and next.js repo. */;
  onTextChange?: (text: string) => void;
}

const editorStates = states({
  isIFrame: { height: '100vh' },
});

const editorBaseStyles = system.css({
  border: 1,
  borderColor: 'gray-900',
  display: 'flex',
  flexDirection: 'column',
  height: '400px',
  width: '688px',
  overflow: 'hidden',
});
export interface EditorStyleProps
  extends StyleProps<typeof editorBaseStyles>,
    StyleProps<typeof editorStates> {}

const EditorContainer = styled(Background)<EditorStyleProps>(
  editorBaseStyles,
  editorStates
);

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language,
  hideCopyButton,
  onCopy,
  isIFrame = false,
  snippetsBaseUrl = '',
  onTextChange,
}) => {
  const [text, setText] = useState<string>(initialText);
  return (
    <EditorContainer bg="black" as="main" isIFrame={isIFrame}>
      <Box borderBottom={1} borderColor="gray-900" py={4} pl={8}>
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
          onTextChange?.(newText);
        }}
        onCopy={onCopy}
        snippetsBaseUrl={snippetsBaseUrl}
      />
    </EditorContainer>
  );
};

export default CodeByteEditor;
