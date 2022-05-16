import { BackgroundProps } from '@codecademy/gamut-styles';
import { UserClickData } from '@codecademy/tracking';

import { LanguageOption } from './consts';

export interface CodebytesChangeHandler {
  (text: string, language: LanguageOption): void;
}

export interface CodebytesCopyFormatter {
  (text: string, language: LanguageOption): string;
}

export interface CodeByteEditorProps
  extends Omit<BackgroundProps, 'onCopy' | 'bg'> {
  text?: string;
  language?: LanguageOption;
  hideCopyButton?: boolean;
  onCopy?: CodebytesChangeHandler;
  copyFormatter?: CodebytesCopyFormatter;
  snippetsBaseUrl?: string;
  onEdit?: CodebytesChangeHandler;
  onLanguageChange?: CodebytesChangeHandler;
  trackingData?: Omit<UserClickData, 'target'>;
  trackFirstEdit?: boolean;
}
