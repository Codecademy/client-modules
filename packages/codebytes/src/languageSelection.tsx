import { Select } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import type { languageOption } from './consts';
import { languageOptions } from './consts';

const StyledSelect = styled(Select)`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
  select {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.black};

    &:hover,
    &:active,
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
    &:focus {
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.primary};
    }
  }
`;

export type LanguageSelectionProps = {
  onChange: (newLanguage: languageOption) => void;
};

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onChange,
}) => {
  return (
    <Background bg="black" flex={1} px={16} pt={48}>
      Which language do you want to code in?
      <StyledSelect
        id="language-select"
        aria-label="Select your language"
        options={languageOptions}
        onChange={(e) => onChange(e.target.value as languageOption)}
      />
    </Background>
  );
};
