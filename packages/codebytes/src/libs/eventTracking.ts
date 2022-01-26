import { createTracker } from '@codecademy/tracking';

const IS_DEV = process.env.NODE_ENV === 'development';
// TODO: confirm tracking details and implementation DISC-447
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.codecademy.com'
    : 'https://staging.codecademy.com/';

const tracker = createTracker({
  apiBaseUrl: API_BASE_URL,
  verbose: IS_DEV,
});

export const {
  click: trackUserClick,
  visit: trackUserVisit,
  impression: trackUserImpression,
} = tracker;
