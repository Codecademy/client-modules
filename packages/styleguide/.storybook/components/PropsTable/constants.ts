import * as system from '@codecademy/gamut-styles/src/theme/props';

const { shouldForwardProp, properties: props, variant, ...groups } = system;

export const properties = Object.entries(props).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

export const propGroups = groups;

export type PropGroups = keyof typeof propGroups;
