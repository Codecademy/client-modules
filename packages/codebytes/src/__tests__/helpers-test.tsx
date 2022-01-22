import { encode } from 'js-base64';

import { CodebytesParams, getOptions, trackClick } from '../helpers';
import { trackUserClick } from '../libs/eventTracking';

jest.mock('../libs/eventTracking');

const initialUrl = window.location.href;
const resetCodebytesParams = () =>
  window.history.replaceState(null, '', initialUrl);
type SetCodebytesParamsProps = Record<CodebytesParams, string>;
const setCodebytesParams = (params: SetCodebytesParamsProps) => {
  if (params.text) {
    params.text = encode(params.text);
  }

  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  window.history.replaceState({}, '', url.toString());
};

describe('getOptions', () => {
  afterEach(() => {
    resetCodebytesParams();
  });

  it('parses props out of the window locations', () => {
    const text = `
    const msg = 'Sup?';
    console.log(msg);
    `.trim();
    setCodebytesParams({
      lang: 'javascript',
      text,
      'copy-mode': '',
      'client-name': 'forum',
      page: 'https://discuss.codecademy.com/some-interesting/post',
      mode: 'compose',
    });

    expect(getOptions()).toEqual({
      clientName: 'forum',
      parentPage: 'https://discuss.codecademy.com/some-interesting/post',
      renderMode: 'compose',
    });
  });
});

describe('trackClick', () => {
  afterEach(() => {
    resetCodebytesParams();
    (trackUserClick as any).mockReset();
  });

  it('proxies to trackUserClick setting the page_name, context, and target', () => {
    const target = 'foobar';
    setCodebytesParams({
      lang: 'javascript',
      text: `
      const msg = 'Sup?';
      console.log(msg);
      `.trim(),
      'copy-mode': '',
      'client-name': 'forum',
      page: 'https://discuss.codecademy.com/some-interesting/post',
      mode: '',
    });
    trackClick(target);
    expect(trackUserClick).toHaveBeenCalledWith({
      page_name: 'forum',
      context: 'https://discuss.codecademy.com/some-interesting/post',
      target,
    });
  });

  it('defaults the client name to "Unknown"', () => {
    const target = 'foobar';
    setCodebytesParams({
      lang: 'javascript',
      text: `
      const msg = 'Sup?';
      console.log(msg);
      `.trim(),
      'copy-mode': '',
      'client-name': '',
      page: 'https://discuss.codecademy.com/some-interesting/post',
      mode: '',
    });
    trackClick(target);
    expect(trackUserClick).toHaveBeenCalledWith({
      page_name: 'Unknown',
      context: 'https://discuss.codecademy.com/some-interesting/post',
      target,
    });
  });

  it('embeds the render mode into the page_name', () => {
    const mode = 'compose';
    const target = 'foobar';
    setCodebytesParams({
      lang: 'javascript',
      text: `
      const msg = 'Sup?';
      console.log(msg);
      `.trim(),
      'copy-mode': '',
      'client-name': 'forum',
      page: 'https://discuss.codecademy.com/some-interesting/post',
      mode,
    });
    trackClick(target);
    expect(trackUserClick).toHaveBeenCalledWith({
      page_name: `forum_${mode}`,
      context: 'https://discuss.codecademy.com/some-interesting/post',
      target,
    });
  });
});
