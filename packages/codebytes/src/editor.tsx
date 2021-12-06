import {
  FillButton,
  FlexBox,
  Spinner,
  TextButton,
  ToolTip,
} from '@codecademy/gamut';
import { CopyIcon } from '@codecademy/gamut-icons';
import { colors } from '@codecademy/gamut-styles';
import { Drawers } from './drawers';

import styled from '@emotion/styled';
import React, { useState } from 'react';

import type { CopyButtonMode, languageOption } from './consts';
import { createBBCodeBlock, trackClick } from './helpers';

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
  background-color: ${colors['gray-900']};
`}
`;

const CopyIconStyled = styled(CopyIcon)`
  margin-right: 0.5rem;
`;

const DOCKER_SIGTERM = 143;

// some of the language names we use internally differ from those used by monaco
const languageOverrides: { [key in languageOption]?: string } = {
  golang: 'go',
};

type EditorProps = {
  copyButtonMode?: CopyButtonMode;
  language: languageOption;
  text: string;
  onChange: (text: string) => void;
};

export const Editor: React.FC<EditorProps> = ({
  copyButtonMode,
  language,
  text,
  onChange,
  onCopy,
}) => {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'ready' | 'waiting' | 'error'>('ready');
  const [isCodeByteCopied, setIsCodeByteCopied] = useState(false);
  const hideCopyButton = copyButtonMode === 'hide';
  const onCopyClick = () => {
    if (!isCodeByteCopied) {
      navigator.clipboard.writeText(createBBCodeBlock({ language, text }));
      setIsCodeByteCopied(true);
      onCopy?.();
    }
  };

  const setErrorStatusAndOutput = (message: string) => {
    setOutput(message);
    setStatus('error');
  };

  const handleSubmit = () => {
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

    const snippetsEndpoint =
      'https://' + process.env.GATSBY_CONTAINER_API_BASE + '/snippets';

    fetch(snippetsEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'x-codecademy-user-id': 'codebytes-anon-user',
      },
    })
      .then((res) => res.json())
      .then((response) => {
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
      })
      .catch((error) => {
        setErrorStatusAndOutput('Error: ' + error);
      });
  };

  return (
    <>
      <Drawers
        leftChild={<div>Simple Monaco Editor Placeholder</div>}
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
            alignment="top-right"
            mode="dark"
            target={
              <TextButton
                variant="secondary"
                onClick={onCopyClick}
                onBlur={() => setIsCodeByteCopied(false)}
              >
                <CopyIconStyled aria-hidden="true" /> Copy Codebyte
              </TextButton>
            }
          >
            {isCodeByteCopied ? (
              <span role="alert">Copied!</span>
            ) : (
              <span>Copy to your clipboard</span>
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

// export const Editor: React.FC<EditorProps> = ({ text, onChange }) => {
//   return <textarea value={text} onChange={(e) => onChange(e.target.value)} />;
// };
