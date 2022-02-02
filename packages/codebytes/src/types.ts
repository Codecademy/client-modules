import { UserClickData } from '@codecademy/tracking';

import { LanguageOption } from './consts';

export interface CodebytesChangeHandler {
  (text: string, language: LanguageOption): void;
}
export interface CodeByteEditorProps {
  text?: string;
  language?: LanguageOption;
  hideCopyButton?: boolean;
  onCopy?: CodebytesChangeHandler;
  isIFrame?: boolean;
  snippetsBaseUrl?: string;
  onEdit?: CodebytesChangeHandler;
  onLanguageChange?: CodebytesChangeHandler;
  trackingData: Omit<UserClickData, 'target'>;
}
