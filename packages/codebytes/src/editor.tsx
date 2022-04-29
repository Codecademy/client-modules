import {
  Box,
  FillButton,
  FlexBox,
  Modal,
  Spinner,
  TextButton,
  ToolTip,
} from '@codecademy/gamut';
import {
  CopyIcon,
  EditorIcon,
  ShareIcon,
  TagIcon,
} from '@codecademy/gamut-icons';
import { UserClickData } from '@codecademy/tracking';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { postSnippet } from './api';
import { BetterSocialMediaSharing } from './BetterSocialSharing/betterSocialSharing';
import type { LanguageOption } from './consts';
import { Drawers } from './drawers';
import { EmbedCodebyteModal } from './EmbedModal';
import { getCodebyteUrl, trackClick } from './helpers';
import qrcodeIcon from './Icons/qr-code-white.png';
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
  color: ${hasError ? theme.colors.orange : theme.colors.text};
  background-color: ${theme.colors['navy-900']};
`}
`;

const Image = Box.withComponent('img');

const CustomIcon = styled(Image)`
  margin-right: 0.5rem;
`;

const TagIconStyled = styled(TagIcon)`
  margin-right: 0.5rem;
`;

const CopyIconStyled = styled(CopyIcon)`
  margin-right: 0.5rem;
`;

const ShareIconStyled = styled(ShareIcon)`
  margin-right: 0.5rem;
`;

const EditorIconStyled = styled(EditorIcon)`
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
  trackingData?: Omit<UserClickData, 'target'>;
};

export const Editor: React.FC<EditorProps> = ({
  language,
  text,
  hideCopyButton,
  onChange,
  onCopy,
  snippetsBaseUrl,
  trackingData,
}) => {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'ready' | 'waiting' | 'error'>('ready');
  const [isCodeByteCopied, setIsCodeByteCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const [qrCode, setQrCode] = useState('');

  const onCopyClick = () => {
    if (!isCodeByteCopied) {
      navigator.clipboard
        .writeText(text)
        // eslint-disable-next-line no-console
        .catch(() => console.error('Failed to copy'));
      setIsCodeByteCopied(true);
      onCopy?.(text, language);
      trackClick('copy', trackingData);
    }
  };

  const onCopyLinkClick = () => {
    navigator.clipboard
      .writeText(getCodebyteUrl(language, text))
      .then(() => setIsLinkCopied(true))
      // eslint-disable-next-line no-console
      .catch(() => console.error('Failed to copy link'));
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
    trackClick('run', trackingData);

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

  const createQrCode = async () => {
    try {
      const response = await fetch(
        'https://qrcode-monkey.p.rapidapi.com/qr/custom',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'qrcode-monkey.p.rapidapi.com',
            'X-RapidAPI-Key':
              '31920734efmsh5d6fdb0ce6b7572p1f4ebdjsneeeaea02fe1d',
          },
          body: JSON.stringify({
            data: getCodebyteUrl(language, text),
            config: {
              body: 'circle',
              eye: 'frame0',
              eyeBall: 'ball15',
              erf1: [],
              erf2: [],
              erf3: [],
              brf1: [],
              brf2: [],
              brf3: [],
              bodyColor: '#3A10E5',
              bgColor: '#FFF0E5',
              eye1Color: '10162F',
              eye2Color: '10162F',
              eye3Color: '10162F',
              eyeBall1Color: '#3A10E5',
              eyeBall2Color: '#3A10E5',
              eyeBall3Color: '#3A10E5',
              gradientColor1: null,
              gradientColor2: null,
              gradientType: 'linear',
              gradientOnEyes: false,
              logo: 'a8473f5aa50795e6d3d50a7aca1c162ccc63c9c8.svg',
              logoMode: 'clean',
            },
            size: 2000,
            download: 'imageUrl',
            file: 'svg',
          }),
        }
      )
        .then((response) => response.json())
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));

      setQrCode(response.imageUrl as string);
    } catch (error) {
      setErrorStatusAndOutput('Error: ' + error);
    }
  };

  const handleQrClick = async () => {
    setQrModalOpen(true);
    // I'm paying for these API calls out of pocket, so only generate the code once.
    // This means if you change the text of the codebyte, you'll need to refresh the page
    // in order to get a fresh QR code
    // In a real implementation (i.e. not a hackathon), we can use the onChange from the editor
    // to clear this only when the codebyte is modified.
    if (!qrCode) {
      await createQrCode();
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
                <CopyIconStyled aria-hidden="true" /> Copy
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
        <TextButton variant="secondary" onClick={() => setShareModalOpen(true)}>
          <ShareIconStyled aria-hidden="true" /> Share
        </TextButton>
        <Modal
          isOpen={shareModalOpen}
          onRequestClose={() => setShareModalOpen(false)}
          title="Share your Codebyte with the world!"
        >
          <BetterSocialMediaSharing
            url={getCodebyteUrl(language, text)}
            message={`Check out this ${language} code I wrote!`}
            hashtags={['codebytes', language]}
          />
          <Box display="block" alignItems="center" p={8}>
            <input
              type="text"
              size={30}
              value={getCodebyteUrl(language, text)}
            />
            <ToolTip
              id="link-copied"
              alignment="top-right"
              mode="dark"
              target={
                <TextButton
                  variant="secondary"
                  onClick={onCopyLinkClick}
                  onBlur={() => setIsLinkCopied(false)}
                >
                  <CopyIconStyled aria-hidden="true" /> Copy Link
                </TextButton>
              }
            >
              {isLinkCopied ? (
                <span role="alert">Copied!</span>
              ) : (
                <span role="alert">Click to copy</span>
              )}
            </ToolTip>
          </Box>
        </Modal>
        <TextButton variant="secondary" onClick={() => setEmbedModalOpen(true)}>
          <EditorIconStyled aria-hidden="true" /> Embed
        </TextButton>
        <EmbedCodebyteModal
          isModalOpen={embedModalOpen}
          setIsModalOpen={setEmbedModalOpen}
          language={language}
          text={text}
        />
        <TextButton variant="secondary" onClick={handleQrClick}>
          <CustomIcon width="24" height="24" src={qrcodeIcon} alt="" /> QR Code
        </TextButton>
        <Modal
          isOpen={qrModalOpen}
          onRequestClose={() => setQrModalOpen(false)}
          title="Share your Codebyte with the world!"
        >
          {qrCode ? (
            <Image src={qrCode} width="200" height="200" alt="" />
          ) : (
            <Spinner />
          )}
        </Modal>
        <TextButton
          variant="secondary"
          href="https://tengu.codecademy.com/fake-shop?PR_ENV=portal-app-pr-1891"
          target="_blank"
        >
          <TagIconStyled aria-hidden="true" /> Shop
        </TextButton>
        <FillButton onClick={handleSubmit}>
          {status === 'waiting' ? <Spinner /> : 'Run'}
        </FillButton>
      </FlexBox>
    </>
  );
};
