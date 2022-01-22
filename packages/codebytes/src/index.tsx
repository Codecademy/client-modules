import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, states, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { helloWorld, LanguageOption } from './consts';
import { Editor } from './editor';
import { getOptions, trackClick } from './helpers';
import { LanguageSelection } from './languageSelection';
import { trackUserImpression } from './libs/eventTracking';
import { CodeByteEditorProps } from './types';

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
  hideCopyButton = false,
  isIFrame = false,
  snippetsBaseUrl = process.env.CONTAINER_API_BASE,
  onEdit,
  onLanguageChange,
  onCopy,
}) => {
  const [text, setText] = useState<string>(initialText ?? '');
  const [language, setLanguage] = useState<LanguageOption>(
    initialLanguage ?? ''
  );
  const [hasBeenEdited, setHasBeenEdited] = useState(false);

  useEffect(() => {
    const options = getOptions();
    const page_name = options.renderMode
      ? `${options.clientName}_${options.renderMode}`
      : options.clientName;

    trackUserImpression({
      page_name,
      context: options.parentPage,
      target: 'codebyte',
    });
  }, []);

  useEffect(() => {
    if (language) {
      setText(initialText ?? (helloWorld[language] || ''));
    }
  }, [language, initialText]);

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
          onClick={() => trackClick('logo')}
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
            const { renderMode } = getOptions();
            if (!renderMode && hasBeenEdited === false) {
              setHasBeenEdited(true);
              trackClick('edit');
            }
          }}
          snippetsBaseUrl={snippetsBaseUrl}
          onCopy={onCopy}
        />
      ) : (
        <LanguageSelection
          onChange={(newLanguage) => {
            const newText: string =
              text || (newLanguage ? helloWorld[newLanguage] : '');
            setLanguage(newLanguage);
            setText(newText);
            onLanguageChange?.(newText, newLanguage);
            trackClick('lang_select');
          }}
        />
      )}
    </EditorContainer>
  );
};

export default CodeByteEditor;
