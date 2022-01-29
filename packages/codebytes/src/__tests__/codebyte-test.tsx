import './mocks';

import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import { encode } from 'js-base64';
import React from 'react';

import { CodeByteEditor } from '..';
import { helloWorld, validLanguages } from '../consts';
import { trackClick } from '../helpers';
import { trackUserImpression } from '../libs/eventTracking';
import { CodeByteEditorProps } from '../types';

const mockEditorTestId = 'mock-editor-test-id';

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

const renderWrapper = setupRtl(CodeByteEditor, {});

type RenderWrapperWithProps = CodeByteEditorProps & { mode?: string };

const renderWrapperWith = ({ mode, ...rest }: RenderWrapperWithProps) => {
  const url = new URL(window.location.href);

  const { text, language } = rest;
  if (text) {
    url.searchParams.set('text', encode(text));
  }
  if (language) {
    url.searchParams.set('lang', language);
  }
  url.searchParams.set('client-name', 'forum');
  url.searchParams.set(
    'page',
    'https://discuss.codecademy.com/some-interesting/post'
  );
  if (mode) {
    url.searchParams.set('mode', mode);
  }
  window.history.replaceState({}, '', url.toString());

  return renderWrapper(rest);
};

describe('CodeBytes', () => {
  const initialUrl = window.location.href;

  afterEach(() => {
    window.history.replaceState(null, '', initialUrl);
    (trackClick as any).mockReset();
    (trackUserImpression as any).mockReset();
  });

  it('has a language-specific "hello world" program defined for each language', () => {
    validLanguages.forEach((language) => {
      expect(helloWorld[language]).toBeDefined();
    });
  });

  it('initializes with a language-specific "hello world" program when there is no language prop', () => {
    const { view } = renderWrapper();
    const selectedLanguage = view.getByRole('combobox') as Element;
    userEvent.selectOptions(selectedLanguage, ['javascript']);
    view.getByText(helloWorld.javascript);
  });

  it('initializes with a language-specific "hello world" program when there is a language prop but no text prop', () => {
    const { view } = renderWrapper({ language: 'javascript' });
    view.getByText(helloWorld.javascript);
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

  describe('Change Handlers', () => {
    it('triggers onEdit on text edit', () => {
      const onEdit = jest.fn();
      const { view } = renderWrapper({
        text: '',
        language: 'javascript',
        onEdit,
      });

      const editor = view.getByTestId(mockEditorTestId);
      userEvent.type(editor, 'dog');

      expect(onEdit).toHaveBeenCalledTimes(3);
      expect(onEdit).toHaveBeenLastCalledWith('dog', 'javascript');
    });

    it('triggers onLanguageChange on language selection', () => {
      const onLanguageChange = jest.fn();
      const { view } = renderWrapper({
        onLanguageChange,
      });

      const selectedLanguage = view.getByRole('combobox') as Element;
      userEvent.selectOptions(selectedLanguage, ['javascript']);

      expect(onLanguageChange).toHaveBeenCalledWith(
        "console.log('Hello world!');",
        'javascript'
      );
    });
  });

  describe('Tracking', () => {
    it('triggers trackClick on clicking the logo', () => {
      const { view } = renderWrapper({});
      const logo = view.getByLabelText('visit codecademy.com');
      userEvent.click(logo);
      expect(trackClick).toHaveBeenCalledWith('logo');
    });

    it('triggers trackClick on language selection', () => {
      const { view } = renderWrapper();
      const selectedLanguage = view.getByRole('combobox') as Element;
      userEvent.selectOptions(selectedLanguage, ['javascript']);
      expect(trackClick).toHaveBeenCalledWith('lang_select');
    });

    it('triggers trackClick for the first edit in view mode', () => {
      const testString = 'original-value';
      const { view } = renderWrapper({
        text: testString,
        language: 'javascript',
      });

      const editor = view.getByTestId(mockEditorTestId);
      userEvent.type(editor, 'd');

      expect(trackClick).toHaveBeenCalledWith('edit');
    });

    it('triggers trackUserImpression for view mode', () => {
      renderWrapperWith({
        text: 'some-value',
        language: 'javascript',
      });

      expect(trackUserImpression).toHaveBeenCalledWith({
        page_name: 'forum',
        context: 'https://discuss.codecademy.com/some-interesting/post',
        target: 'codebyte',
      });
    });

    it('triggers trackUserImpression for compose mode', () => {
      renderWrapperWith({
        text: 'some-value',
        language: 'javascript',
        mode: 'compose',
      });

      expect(trackUserImpression).toHaveBeenCalledWith({
        page_name: 'forum_compose',
        context: 'https://discuss.codecademy.com/some-interesting/post',
        target: 'codebyte',
      });
    });
  });
});
