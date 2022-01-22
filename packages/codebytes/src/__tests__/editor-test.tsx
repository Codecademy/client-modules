import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Editor } from '../editor';
import { trackClick } from '../helpers';

jest.mock('../MonacoEditor', () => ({
  SimpleMonacoEditor: ({ value }: { value: string }) => <>{value}</>,
}));

jest.mock('react-resize-observer');
jest.mock('../libs/eventTracking');
jest.mock('../helpers', () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...jest.requireActual('../helpers'),
  trackClick: jest.fn(),
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
    writeText: jest.fn(),
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

  describe('Change Handlers', () => {
    it('triggers onCopy upon clicking the copy button', () => {
      const onCopy = jest.fn();
      const { view } = renderWrapper({
        onCopy,
      });

      const copyButton = view.getByTestId('copy-codebyte-btn');
      userEvent.click(copyButton);

      expect(onCopy).toHaveBeenCalled();
    });
  });

  describe('Tracking', () => {
    it('track clicks on Run button', async () => {
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

      expect(trackClick).toHaveBeenCalledWith('run');
    });
  });
});
