import './mocks';

import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Editor } from '../editor';
import { trackClick } from '../helpers';

jest.mock('../MonacoEditor', () => ({
  SimpleMonacoEditor: ({ value }: { value: string }) => <>{value}</>,
}));

const renderWrapper = setupRtl(Editor, {
  hideCopyButton: false,
  language: 'javascript',
  text: 'hello world',
  onChange: jest.fn(),
  snippetsBaseUrl: '',
});

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('Editor', () => {
  (global as any).fetch = jest.fn();
  afterEach(() => {
    (global as any).fetch.mockClear();
  });

  it('shows a prompt tooltip when the CodeByte has __not__ been copied via the button', () => {
    const { view } = renderWrapper();
    expect(view.queryByTestId('copy-confirmation-tooltip')).toBeFalsy();
    view.getByTestId('copy-prompt-tooltip');
  });

  it('shows a confirmation tooltip when the CodeByte has been copied via the button', () => {
    const { view } = renderWrapper();
    const copyBtn = view.getByTestId('copy-codebyte-btn');
    userEvent.click(copyBtn as HTMLButtonElement);
    expect(view.queryByTestId('copy-prompt-tooltip')).toBeFalsy();
    view.getByTestId('copy-confirmation-tooltip');
  });

  it('hides the copy codebyte button if hideCopyButton prop is true"', () => {
    const { view } = renderWrapper({
      hideCopyButton: true,
    });
    expect(view.queryByTestId('copy-codebyte-btn')).toBeNull();
  });

  it('shows the copy codebyte button if hideCopyButton prop is not set', () => {
    const { view } = renderWrapper();

    view.getByTestId('copy-codebyte-btn');
  });

  describe('Tracking', () => {
    it('tracks clicks on the run button', async () => {
      (global as any).fetch.mockResolvedValue({
        json: () =>
          Promise.resolve({
            stderr: [],
            exit_code: 0,
            stdout: '',
          }),
      });
      const { view } = renderWrapper({
        onChange: jest.fn(),
        text: 'test',
        language: 'javascript',
      });

      const runButton = view.getByText('Run');
      await act(async () => {
        userEvent.click(runButton);
      });

      expect(trackClick).toHaveBeenCalledWith('run', undefined);
    });

    it('tracks clicks on the copy codebyte button', () => {
      const { view } = renderWrapper({
        onChange: jest.fn(),
        text: 'test',
        language: 'javascript',
      });

      const copyButton = view.getByTestId('copy-codebyte-btn');
      userEvent.click(copyButton);

      expect(trackClick).toHaveBeenCalledWith('copy', undefined);
    });
  });
});
