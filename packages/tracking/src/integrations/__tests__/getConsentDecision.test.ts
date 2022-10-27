import { Consent } from '../consent';
import {
  getConsentDecision,
  OPT_OUT_DATALAYER_VAR,
} from '../getConsentDecision';
import { TrackingWindow } from '../types';

const MINIMUM_CONSENT = [Consent.StrictlyNecessary];

const FULL_CONSENT = [
  Consent.StrictlyNecessary,
  Consent.Functional,
  Consent.Performance,
  Consent.Targeting,
];

const FULL_CONSENT_STRING = [',', ...FULL_CONSENT].join(',');

describe('getConsentDecision', () => {
  it('converts a stringified consent decision into an array', () => {
    const result = getConsentDecision({
      scope: {
        OnetrustActiveGroups: FULL_CONSENT_STRING,
      },
    });
    expect(result).toEqual(FULL_CONSENT);
  });

  it('does not modify an array formatted consent decision', () => {
    const result = getConsentDecision({
      scope: {
        OnetrustActiveGroups: FULL_CONSENT,
      },
    });
    expect(result).toEqual(FULL_CONSENT);
  });

  describe('optedOutExternalTracking', () => {
    it('reduces the consent decision to necessary and functional for opted out users', () => {
      const result = getConsentDecision({
        scope: {
          OnetrustActiveGroups: FULL_CONSENT,
        },
        optedOutExternalTracking: true,
      });
      expect(result).toEqual([Consent.StrictlyNecessary, Consent.Functional]);
    });

    it('does not add Functional tracking if the user has opted out of it', () => {
      const result = getConsentDecision({
        scope: {
          OnetrustActiveGroups: MINIMUM_CONSENT,
        },
        optedOutExternalTracking: true,
      });
      expect(result).toEqual(MINIMUM_CONSENT);
    });

    it('triggers the opt out datalayer variable', () => {
      const scope: TrackingWindow = {
        OnetrustActiveGroups: FULL_CONSENT,
      };
      getConsentDecision({
        scope,
        optedOutExternalTracking: true,
      });
      const dataLayerVars = scope.dataLayer
        ?.map((v: Record<string, unknown>) => Object.keys(v))
        .flat();
      expect(dataLayerVars).toEqual([OPT_OUT_DATALAYER_VAR]);
    });
  });
});
