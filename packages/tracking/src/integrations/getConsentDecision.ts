import { Consent } from './consent';
import { TrackingWindow } from './types';

export interface ConsentDecisionOptions {
  scope: TrackingWindow;
  optedOutExternalTracking?: boolean;
}

export const OPT_OUT_DATALAYER_VAR = 'user_opted_out_external_tracking';

export const getConsentDecision = ({
  scope,
  optedOutExternalTracking,
}: ConsentDecisionOptions) => {
  let consentDecision: Consent[] = [];

  if (typeof scope.OnetrustActiveGroups === 'string') {
    consentDecision = scope.OnetrustActiveGroups.split(',').filter(
      Boolean
    ) as Consent[];
  } else if (scope.OnetrustActiveGroups) {
    consentDecision = scope.OnetrustActiveGroups;
  }

  if (optedOutExternalTracking) {
    /**
     * If user has already opted out of everything but the essentials
     * don't force them to consent to Functional trackers
     */
    if (consentDecision.length > 1) {
      consentDecision = [Consent.StrictlyNecessary, Consent.Functional];
    }
    scope.dataLayer ??= [];
    scope.dataLayer.push({ [OPT_OUT_DATALAYER_VAR]: true });
  }

  return consentDecision;
};
