import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, states, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { helloWorld, LanguageOption } from './consts';
import { Editor } from './editor';
import { LanguageSelection } from './languageSelection';

type CodebytesChangeHandler = (text: string, language: LanguageOption) => void;

export interface CodeByteEditorProps {
  text: string;
  language: LanguageOption;
  hideCopyButton: boolean;
  onCopy?: CodebytesChangeHandler;
  isIFrame?: boolean;
  snippetsBaseUrl?: string;
  onEdit?: CodebytesChangeHandler;
  onLanguageChange?: CodebytesChangeHandler;
}

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

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language: initialLanguage,
  hideCopyButton,
  isIFrame = false,
  snippetsBaseUrl = process.env.CONTAINER_API_BASE,
  onEdit,
  onLanguageChange,
}) => {
  const [text, setText] = useState<string>(initialText);
  const [language, setLanguage] = useState<LanguageOption>(initialLanguage);
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
      {language ? (
        <Editor
          language={language}
          text={text}
          hideCopyButton={hideCopyButton}
          onChange={(newText: string) => {
            setText(newText);
            onEdit?.(newText, language);
          }}
          snippetsBaseUrl={snippetsBaseUrl}
        />
      ) : (
        <LanguageSelection
          onChange={(newLanguage) => {
            const newText: string =
              text || (newLanguage ? helloWorld[newLanguage] : '');
            setLanguage(newLanguage);
            setText(newText);
            onLanguageChange?.(newText, newLanguage);
          }}
        />
      )}
    </EditorContainer>
  );
};

export default CodeByteEditor;
