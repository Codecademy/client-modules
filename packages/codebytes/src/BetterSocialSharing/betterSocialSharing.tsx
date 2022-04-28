import { Box, GridBox, Text } from '@codecademy/gamut';
import {
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
} from '@codecademy/gamut-icons';
import React from 'react';

import { BaseSocialShareProps , SocialShareIconLink } from './SocialShareIconLink';

/*
  The SocialMediaSharing component in gamut-labs has some issues.
  It doesn't respect the hashtags input for Facebook.
  LinkedIn sharing doesn't allow URL params, so sharing Codebytes is not possible.
  Additionally, I wanted to add several other social media platforms.
  For the sake of the hackathon, I just copy-pasted that component and modified it here,
  but if we implement this for real we should update the actual component in gamut-labs.
*/

export type SocialMediaShare = {
  url: string;
  message?: string;
  hashtags?: string[];
  mention?: string;
};

export const createShareLink = (
  formatter: (payload: SocialMediaShare) => Record<string, string>,
  baseUri: string,
  payload: SocialMediaShare
) => {
  const params = formatter(payload);
  const url = new URL(baseUri);

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return url.toString();
};

export const SOCIAL_SHARING_PLATFORMS = [
  {
    id: 'facebook',
    icon: FacebookIcon,
    baseUrl: 'https://www.facebook.com/dialog/share?app_id=212500508799908',
    formatShare: ({ url, message, hashtags }: SocialMediaShare) => ({
      ...(url && { href: url }),
      ...(message && { quote: message }),
      hashtag: hashtags ? `#${hashtags[0]}` : '#codecademy',
    }),
  },
  {
    id: 'twitter',
    icon: TwitterIcon,
    baseUrl: 'https://twitter.com/intent/tweet?',
    formatShare: ({ url, message, hashtags, mention }: SocialMediaShare) => ({
      ...(url && { url }),
      ...(message && { text: message }),
      ...(hashtags && { hashtags: hashtags.join(',') }),
      ...(mention && { via: mention }),
    }),
  },
  {
    id: 'reddit',
    icon: RedditIcon,
    baseUrl: 'https://reddit.com/submit',
    formatShare: ({ url, message}: SocialMediaShare) => ({
      ...(url && { url }),
      ...(message && { title: message }),
    }),
  },
];

export type SocialMediaSharingProps = BaseSocialShareProps & {
  url: string;
  message?: string;
  hashtags?: string[];
  mention?: string;
  action?: (e: React.MouseEvent, target: string) => void;
  label?: string;
  iconStyles?: string;
};

export const BetterSocialMediaSharing: React.FC<SocialMediaSharingProps> = ({
  url,
  message,
  hashtags,
  mention,
  action,
  label,
  sectionId,
  size = 'normal',
  iconStyles,
}) => {
  return (
    <Box display="inline-flex" flexDirection="column" alignItems="center">
      {label && (
        <Text
          fontSize={size === 'small' ? 14 : 16}
          textColor="text"
          mb={16}
          data-testid="social-sharing-label"
        >
          {label}
        </Text>
      )}
      <GridBox
        gridAutoColumns="max-content"
        gridAutoFlow="column"
        gap={16}
        className={iconStyles}
      >
        {SOCIAL_SHARING_PLATFORMS.map(({ id, icon, formatShare, baseUrl }) => (
          <SocialShareIconLink
            key={id}
            id={id}
            sectionId={sectionId}
            href={createShareLink(formatShare, baseUrl, {
              url,
              message,
              hashtags,
              mention,
            })}
            icon={icon}
            size={size}
            onClick={(e) => action?.(e, `${id}_share`)}
          />
        ))}
      </GridBox>
    </Box>
  );
};
