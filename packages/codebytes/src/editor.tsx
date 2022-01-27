import {
  FillButton,
  FlexBox,
  Spinner,
  TextButton,
  ToolTip,
} from '@codecademy/gamut';
import { CopyIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { postSnippet } from './api';
import type { LanguageOption } from './consts';
import { Drawers } from './drawers';
import { trackClick } from './helpers';
import { SimpleMonacoEditor } from './MonacoEditor';
import { CodebytesChangeHandler } from './types';

const Output = styled.pre<{ hasError: boolean }>`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 1rem;
  font-family: Monaco;
  font-size: 0.875rem;
  overflow: auto;
  ${({ hasError, theme }) => `
  color: ${hasError ? theme.colors.orange : theme.colors.white};
  background-color: ${theme.colors['navy-900']};
`}
`;

const CopyIconStyled = styled(CopyIcon)`
  margin-right: 0.5rem;
`;

const DOCKER_SIGTERM = 143;

type EditorProps = {
  hideCopyButton: boolean;
  language: LanguageOption;
  text: string;
  onChange: (text: string) => void;
  snippetsBaseUrl?: string;
  onCopy?: CodebytesChangeHandler;
};

export const Editor: React.FC<EditorProps> = ({
  language,
  text,
  hideCopyButton,
  onChange,
  snippetsBaseUrl,
  onCopy,
}) => {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'ready' | 'waiting' | 'error'>('ready');
  const [isCodeByteCopied, setIsCodeByteCopied] = useState(false);
  const onCopyClick = () => {
    if (!isCodeByteCopied) {
      navigator.clipboard
        .writeText(text)
        // eslint-disable-next-line no-console
        .catch(() => console.error('Failed to copy'));
      setIsCodeByteCopied(true);
      trackClick('copy');
      onCopy?.(text, language);
    }
  };

  const setErrorStatusAndOutput = (message: string) => {
    setOutput(message);
    setStatus('error');
  };

  const handleSubmit = async () => {
    if (text.trim().length === 0) {
      return;
    }
    const data = {
      language,
      code: text,
    };
    setStatus('waiting');
    setOutput('');
    trackClick('run');

    try {
      const response = await postSnippet(data, snippetsBaseUrl);
      if (response.stderr.length > 0) {
        setErrorStatusAndOutput(response.stderr);
      } else if (response.exit_code === DOCKER_SIGTERM) {
        setErrorStatusAndOutput(
          'Your code took too long to return a result. Double check your code for any issues and try again!'
        );
      } else if (response.exit_code !== 0) {
        setErrorStatusAndOutput('An unknown error occured.');
      } else {
        setOutput(response.stdout);
        setStatus('ready');
      }
    } catch (error) {
      setErrorStatusAndOutput('Error: ' + error);
    }
  };

  return (
    <>
      <Drawers
        leftChild={
          <SimpleMonacoEditor
            value={text}
            language={language}
            onChange={onChange}
          />
        }
        rightChild={
          <Output hasError={status === 'error'} aria-live="polite">
            {output}
          </Output>
        }
      />
      <FlexBox
        justifyContent={hideCopyButton ? 'flex-end' : 'space-between'}
        pl={8}
      >
        {!hideCopyButton ? (
          <ToolTip
            id="codebyte-copied"
            alignment="top-right"
            mode="dark"
            target={
              <TextButton
                variant="secondary"
                onClick={onCopyClick}
                onBlur={() => setIsCodeByteCopied(false)}
                data-testid="copy-codebyte-btn"
              >
                <CopyIconStyled aria-hidden="true" /> Copy Codebyte
              </TextButton>
            }
          >
            {isCodeByteCopied ? (
              <span data-testid="copy-confirmation-tooltip" role="alert">
                Copied!
              </span>
            ) : (
              <span data-testid="copy-prompt-tooltip">
                Copy to your clipboard
              </span>
            )}
          </ToolTip>
        ) : null}
        <FillButton onClick={handleSubmit}>
          {status === 'waiting' ? <Spinner /> : 'Run'}
        </FillButton>
      </FlexBox>
    </>
  );
};
