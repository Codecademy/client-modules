import { Select, Text } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import React from 'react';

import type { languageOption } from './consts';
import { languageOptions } from './consts';

export type LanguageSelectionProps = {
  onChange: (newLanguage: languageOption) => void;
};

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onChange,
}) => {
  return (
    <ColorMode mode="dark" flex={1} px={16} pt={48}>
      <Text mb={16}>Which language do you want to code in?</Text>
      <Select
        id="language-select"
        aria-label="Select a language"
        options={languageOptions}
        onChange={(e) => onChange(e.target.value as languageOption)}
      />
    </ColorMode>
  );
};
