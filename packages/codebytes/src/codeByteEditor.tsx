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

const editorBaseStyles = system.css({
  border: 1,
  borderColor: 'gray-900',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const EditorContainer = styled(Background)<StyleProps<typeof editorBaseStyles>>(
  editorBaseStyles
);

export const CodeByteEditor: React.FC<CodeByteEditorProps> = ({
  text: initialText,
  language: initialLanguage,
  hideCopyButton = false,
  snippetsBaseUrl,
  onEdit,
  onLanguageChange,
  onCopy,
  trackingData,
  ...rest
}) => {
  const getInitialText = () => {
    if (initialText !== undefined) return initialText;
    return initialLanguage ? helloWorld[initialLanguage] : '';
  };

  const [text, setText] = useState<string>(getInitialText());
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

  return (
    <EditorContainer bg="black" height="25rem" width="43rem" {...rest}>
      <Box borderBottom={1} borderColor="gray-900" py={4} pl={8}>
        <IconButton
          icon={FaviconIcon}
          variant="secondary"
          href="https://www.codecademy.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="visit codecademy.com"
          onClick={() => trackClick('logo', trackingData)}
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
              trackClick('edit', trackingData);
            }
          }}
          snippetsBaseUrl={snippetsBaseUrl}
          onCopy={onCopy}
          trackingData={trackingData}
        />
      ) : (
        <LanguageSelection
          onChange={(newLanguage) => {
            const newText: string =
              text || (newLanguage ? helloWorld[newLanguage] : '');
            setLanguage(newLanguage);
            setText(newText);
            trackClick('lang_select', trackingData);
            onLanguageChange?.(newText, newLanguage);
          }}
        />
      )}
    </EditorContainer>
  );
};

export default CodeByteEditor;
