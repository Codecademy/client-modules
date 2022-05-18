import { Box, IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { helloWorld, LanguageOption } from './consts';
import { Editor } from './editor';
import { trackClick } from './helpers';
import { LanguageSelection } from './languageSelection';
import { trackUserImpression } from './libs/eventTracking';
import { CodeByteEditorProps } from './types';

const editorBaseStyles = system.css({
  border: 1,
  borderColor: 'gray-900',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '25rem',
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
  copyFormatter,
  trackingData,
  trackFirstEdit = false,
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
    trackUserImpression({
      page_name: trackingData?.page_name ?? 'Unknown',
      context: trackingData?.context ?? document.referrer,
      target: 'codebyte',
    });
  }, [trackingData]);

  return (
    <EditorContainer bg="black" maxWidth="43rem" {...rest} overflow="hidden">
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
            if (trackFirstEdit && hasBeenEdited === false) {
              setHasBeenEdited(true);
              trackClick('edit', trackingData);
            }
          }}
          snippetsBaseUrl={snippetsBaseUrl}
          copyFormatter={copyFormatter}
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
