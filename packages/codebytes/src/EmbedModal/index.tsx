import {
  Box,
  Modal,
  SelectDropdown,
  Text,
  TextButton,
  ToolTip,
} from '@codecademy/gamut';
import { CopyIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { LanguageOption } from '../consts';
import { getCodebyteUrl } from '../helpers';

export type EmbedCodebyteModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  language: LanguageOption;
  text: string;
};

const CopyIconStyled = styled(CopyIcon)`
  margin-right: 0.5rem;
`;

// ToDo: work some Typescript magic
const EMBED_OPTIONS = [
  'IFrame',
  'React',
  'Discourse',
  'Codecademy Docs',
  'Codecademy Articles',
];

function getInstructionsForDestination(destination: string): React.ReactNode {
  switch (destination) {
    case 'IFrame':
      return (
        <Text mb={16} display="block" p={8}>
          IFrames are a portable way to embed one webpage inside another. This
          method works with raw HTML. However, it may be disabled on some sites.
        </Text>
      );
    case 'React':
      return (
        <Text mb={16} display="block" p={8}>
          Add to a page that already uses React. Be sure to also install and
          import the @codecademy/codebytes package (e.g. yarn add
          @codecademy/codebytes).
        </Text>
      );
    case 'Discourse':
      return (
        <Text mb={16} display="block" p={8}>
          Works on any Discourse forum that has the{' '}
          <a href="https://github.com/codecademy/discourse-codebytes-plugin">
            Codebytes plugin
          </a>{' '}
          installed, such as{' '}
          <a href="discuss.codecademy.com">discuss.codecademy.com</a>
        </Text>
      );
    case 'Codecademy Docs':
      return (
        <Text mb={16} display="block" p={8}>
          <a href="https://www.codecademy.com/resources/docs">
            Codecademy Docs
          </a>{' '}
          are a community-driven collection of code documentation for popular
          programming languages and frameworks. Anyone is welcome to contribute!
          Head on over to our{' '}
          <a href="https://github.com/Codecademy/docs/blob/main/.github/CONTRIBUTING.md">
            Contribution Guide
          </a>
          .
        </Text>
      );
    case 'Codecademy Articles':
      return (
        <Text mb={16} display="block" p={8}>
          Coming soon! Users will be able to write and publish articles on
          Codecademy. In the meantime, this option is for Curriculum Developers.
        </Text>
      );
    default:
      return (
        <Text mb={16} display="block" p={8}>
          Choose from the dropdown
        </Text>
      );
  }
}

export const EmbedCodebyteModal: React.FC<EmbedCodebyteModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  language,
  text,
}) => {
  const [embedDestination, setEmbedDestination] = useState('');
  const [isEmbedCopied, setIsEmbedCopied] = useState(false);
  const onCopyEmbedClick = () => {
    navigator.clipboard
      .writeText(getEmbedSyntaxForDestination(embedDestination))
      .then(() => setIsEmbedCopied(true))
      // eslint-disable-next-line no-console
      .catch(() => console.error('Failed to copy embed'));
  };

  const getEmbedSyntaxForDestination = (destination: string) => {
    switch (destination) {
      case 'IFrame':
        return `<iframe title="codebyte" src="${getCodebyteUrl(
          language,
          text
        )}"/>`;
      case 'React':
        return `<CodeByteEditor
        text={\`${text}\`}
        language="${language}"
        snippetsBaseUrl="propeller.cc-le-cf.com"
        maxWidth="100%"
        height="50vh"
        width="50vw"
      />`;
      case 'Discourse':
        return `[codebyte language=${language}]\n${text}\n[/codebyte]\n`;
      case 'Codecademy Docs':
        return `\`\`\`codebyte/${language}\n${text}\n\`\`\``;
      case 'Codecademy Articles':
        return `\`\`\`codebyte/${language}\n${text}\n\`\`\``;
      default:
        return '';
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      title="Embed your Codebyte on your own page"
    >
      <Box display="block" alignItems="center" p={8}>
        <SelectDropdown
          options={EMBED_OPTIONS}
          placeholder="Choose a destination"
          onChange={(option) => {
            if (!option) return;
            setEmbedDestination(option.value);
          }}
        />
        {getInstructionsForDestination(embedDestination)}
        {embedDestination && (
          <>
            <textarea
              value={getEmbedSyntaxForDestination(embedDestination)}
              cols={60}
            />
            <ToolTip
              id="embed-copied"
              alignment="top-right"
              mode="dark"
              target={
                <TextButton
                  variant="secondary"
                  onClick={onCopyEmbedClick}
                  onBlur={() => setIsEmbedCopied(false)}
                >
                  <CopyIconStyled aria-hidden="true" /> Copy Embed
                </TextButton>
              }
            >
              {isEmbedCopied ? (
                <span role="alert">Copied!</span>
              ) : (
                <span role="alert">Click to copy</span>
              )}
            </ToolTip>
          </>
        )}
      </Box>
    </Modal>
  );
};
