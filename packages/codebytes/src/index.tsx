import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, states, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { helloWorld, languageOption } from './consts';
import { Editor } from './editor';
import { LanguageSelection } from './languageSelection';

export type CodeBytesChangeHandler = (
  text: string,
  language: languageOption
) => void;

export type CodeBytesChangeHandlerMap = {
  logoClick?: () => void;
  edit?: CodeBytesChangeHandler;
  copy?: CodeBytesChangeHandler;
  languageChange?: CodeBytesChangeHandler;
  run?: () => void;
};
export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
  onCopy?: (text: string, language: string) => void;
  isIFrame?: boolean;
  snippetsBaseUrl?: string /* TODO in DISC-353: Determine best way to host and include snippets endpoint for both staging and production in both the monolith and next.js repo. */;
  on?: CodeBytesChangeHandlerMap;
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
  snippetsBaseUrl = '',
  on,
}) => {
  const [text, setText] = useState<string>(initialText);
  const [language, setLanguage] = useState<languageOption>(initialLanguage);
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
            on?.edit?.(newText, language);
          }}
          on={on}
          snippetsBaseUrl={snippetsBaseUrl}
        />
      ) : (
        <LanguageSelection
          onChange={(newLanguage) => {
            const newText: string = text || helloWorld[newLanguage] || '';
            setLanguage(newLanguage);
            setText(newText);
            on?.languageChange?.(newText, newLanguage);
          }}
        />
      )}
    </EditorContainer>
  );
};

export default CodeByteEditor;
