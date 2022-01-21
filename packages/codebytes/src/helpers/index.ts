import Uri from 'jsuri';

import { trackUserClick } from '../libs/eventTracking';

export type CodebyteOptions = {
  clientName: string;
  parentPage: string;
  renderMode: string;
};

export enum CodebytesParams {
  Language = 'lang',
  Text = 'text',
  CopyMode = 'copy-mode',
  ClientName = 'client-name',
  Page = 'page',
  Mode = 'mode',
}

export const getOptions = (): CodebyteOptions => {
  const currentUri = new Uri(window.location.href);

  return {
    clientName:
      currentUri.getQueryParamValue(CodebytesParams.ClientName) || 'Unknown',
    parentPage:
      currentUri.getQueryParamValue(CodebytesParams.Page) || document.referrer,
    renderMode: currentUri.getQueryParamValue(CodebytesParams.Mode) || '',
  };
};

export const trackClick = (target: string) => {
  const options = getOptions();
  const page_name = options.renderMode
    ? `${options.clientName}_${options.renderMode}`
    : options.clientName;

  trackUserClick({
    page_name,
    context: options.parentPage,
    target,
  });
};
