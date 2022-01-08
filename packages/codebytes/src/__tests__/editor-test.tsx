import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Editor } from '../editor';

jest.mock('../MonacoEditor', () => ({
  SimpleMonacoEditor: ({ value }: { value: string }) => <>{value}</>,
}));

jest.mock('react-resize-observer');
// jest.mock('../helpers', () => ({
//   ...jest.requireActual('../helpers'),
//   trackClick: jest.fn(),
// }));

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
    userEvent.click(copyBtn);
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
});
