import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CodeByteEditor } from '..';
import { helloWorld, validLanguages } from '../consts';

const mockEditorTestId = 'mock-editor-test-id';

jest.mock('react-resize-observer');
// This is a super simplified mock capable of render value and trigger onChange.
jest.mock('../MonacoEditor', () => ({
  SimpleMonacoEditor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string) => void;
  }) => (
    <>
      {value}
      <input
        data-testid={mockEditorTestId}
        type="text"
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        value={value}
      />
    </>
  ),
}));

const renderWrapper = setupRtl(CodeByteEditor, {
  snippetsBaseUrl: '',
});

describe('CodeBytes', () => {
  it('has a language-specific "hello world" program defined for each language', () => {
    validLanguages.forEach((language) => {
      expect(helloWorld[language]).toBeDefined();
    });
  });

  it('initializes with a language-specific "hello world" program when there is no language prop', () => {
    const { view } = renderWrapper();
    const selectedLanguage = view.getByRole('combobox') as Element;
    userEvent.selectOptions(selectedLanguage, ['javascript']);
    view.getByText(helloWorld.javascript!);
  });

  it('initializes with a language-specific "hello world" program when there is a language prop but no text prop', () => {
    const { view } = renderWrapper({ language: 'javascript' });
    view.getByText(helloWorld.javascript!);
  });

  it('initializes with deserialized text when there is a text prop but no language prop', () => {
    const testString = 'yes hello';
    const { view } = renderWrapper({ text: testString });
    const selectedLanguage = view.getByRole('combobox') as Element;
    userEvent.selectOptions(selectedLanguage, ['javascript']);
    view.getByText(testString);
  });

  it('initializes with deserialized text when there is both a language and text prop', () => {
    const testString = 'yes hello';
    const { view } = renderWrapper({
      text: testString,
      language: 'javascript',
    });
    view.getByText(testString);
  });
});
