/* eslint-disable no-console */
import { createTracker } from '@codecademy/tracking';

const IS_DEV = process.env.NODE_ENV === 'development';
const API_BASE_URL =
  process.env.GATSBY_MONOLITH_API_BASE || 'https://www.codecademy.com';

const tracker = createTracker({
  apiBaseUrl: API_BASE_URL,
  verbose: IS_DEV,
});

export const {
  click: trackUserClick,
  visit: trackUserVisit,
  impression: trackUserImpression,
} = tracker;
