import { UserClickData } from '@codecademy/tracking';

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
  const currentUri = new URL(window.location.href);

  return {
    clientName:
      currentUri.searchParams.get(CodebytesParams.ClientName) || 'Unknown',
    parentPage:
      currentUri.searchParams.get(CodebytesParams.Page) || document.referrer,
    renderMode: currentUri.searchParams.get(CodebytesParams.Mode) || '',
  };
};

export const trackClick = (
  target: string,
  trackingData: Omit<UserClickData, 'target'>
) => {
  if (trackingData) {
    return trackUserClick({
      ...trackingData,
      target,
    });
  }
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
