import { BackgroundProps } from '@codecademy/gamut-styles';
import { UserClickData } from '@codecademy/tracking';

import { LanguageOption } from './consts';

export interface CodebytesChangeHandler {
  (text: string, language: LanguageOption): void;
}

export interface CodebytesCopyFormatterParams {
  text: string;
  language: LanguageOption;
}

export type CodebytesCopyFormatter =
  ({text, language}: CodebytesCopyFormatterParams) => string;

export interface CodeByteEditorProps
  extends Omit<BackgroundProps, 'bg'> {
  text?: string;
  language?: LanguageOption;
  hideCopyButton?: boolean;
  copyFormatter?: CodebytesCopyFormatter;
  snippetsBaseUrl?: string;
  onEdit?: CodebytesChangeHandler;
  onLanguageChange?: CodebytesChangeHandler;
  trackingData?: Omit<UserClickData, 'target'>;
  trackFirstEdit?: boolean;
}
