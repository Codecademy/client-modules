import { getClientType } from '../integrations/device';
/* eslint-disable no-console */
import type {
  EventDataTypes,
  TrackingOptions,
  UserClickData,
  UserImpressionData,
  UserVisitData,
} from './types';

export type TrackerOptions = {
  apiBaseUrl: string;
  verbose?: boolean;
};

const browserSupportsKeepalive = () => 'keepalive' in window.Request.prototype;

export const createTracker = ({ apiBaseUrl, verbose }: TrackerOptions) => {
  const beacon = (endpoint: string, data: Record<string, string>) => {
    const uri = new URL(endpoint, apiBaseUrl).toString();
    const form = new FormData();
    for (const [k, v] of Object.entries(data)) {
      form.append(k, v.toString());
    }

    try {
      // Firefox allows users to disable navigator.sendBeacon, and very old Safari versions don't have it.
      // [WEB-1700]: Additionally, Chrome 79-80 gives "Illegal invocation" with ?., so through 2022 we should support them.
      // It seems similar to this: https://github.com/vercel/next.js/issues/23856
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (navigator.sendBeacon && navigator.sendBeacon(uri, form)) {
        return;
      }
    } catch {
      // Even with the proper scoping, Chrome 79-80 still gives "Illegal invocation" crashes. Sigh.
    }

    // Either way, we fall back to standard fetch if sendBeacon fails.
    // We don't mind this rejecting with an error because it's tracking, and we'll know if that starts to fail.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.fetch(uri, {
      method: 'POST',
      body: form,
      ...(browserSupportsKeepalive() && { keepalive: true }),
    });
  };

  const event = <
    Category extends keyof EventDataTypes,
    Event extends string & keyof EventDataTypes[Category],
    Data extends EventDataTypes[Category][Event]
  >(
    category: Category,
    event: Event,
    userData: Data,
    options: TrackingOptions = {}
  ) => {
    const properties = {
      ...userData,
      fullpath: window.location.pathname + window.location.search,
      search: window.location.search,
      path: window.location.pathname,
      title: window.document.title,
      url: window.location.href,
      referrer: window.document.referrer,
      client: getClientType(),
    };

    if (verbose) {
      console.groupCollapsed(
        `%cTracking Event Fired: ${category}:${event}`,
        'color: #4b35ef; font-style: italic;'
      );
      console.log({
        category,
        event,
        properties,
      });
      console.groupEnd();
    }

    // This allows the UTM query params to get registered in the user session.
    const queryParams = window.location.search;
    beacon(`/analytics/${category}${queryParams}`, {
      category,
      event,
      properties: JSON.stringify(properties),
      gdpr_safe: `${options.gdprSafe}`,
    });
  };

  return {
    event,
    click: (data: UserClickData) => event('user', 'click', data),
    impression: (data: UserImpressionData) => event('user', 'impression', data),
    visit: (data: UserVisitData) => event('user', 'visit', data),
    pushDataLayerEvent: (eventName: string) => {
      ((window as any).dataLayer ||= []).push({ event: eventName });
    },
  };
};
