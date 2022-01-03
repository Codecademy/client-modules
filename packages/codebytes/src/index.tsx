import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, states, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { languageOption } from './consts';
import { Editor } from './editor';

const editorStates = states({
  isIFrame: { height: '100vh' },
});

const editorBaseStyles = system.css({
  border: 1,
  borderColor: 'gray-900',
  display: 'flex',
  flexDirection: 'column',
  height: '25rem',
  width: '43rem',
  overflow: 'hidden',
});
export interface EditorStyleProps
  extends StyleProps<typeof editorBaseStyles>,
    StyleProps<typeof editorStates> {}

const EditorContainer = styled(Background)<EditorStyleProps>(
  editorBaseStyles,
  editorStates
);

export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
  onCopy?: (text: string, language: string) => void;
  isIFrame?: boolean;
  snippetsBaseUrl?: string;
  onTextChange?: (text: string) => void;
}

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language,
  hideCopyButton,
  onCopy,
  isIFrame = false,
  snippetsBaseUrl = process.env.CONTAINER_API_BASE,
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
