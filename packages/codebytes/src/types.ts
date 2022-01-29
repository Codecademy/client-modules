import { LanguageOption } from './consts';

<<<<<<< HEAD
export interface CodebytesChangeHandler {
  (text: string, language: LanguageOption): void;
}

export interface CodeByteEditorProps {
  text?: string;
  language?: LanguageOption;
  hideCopyButton?: boolean;
=======
interface CodebytesChangeHandler {
  (text: string, language: LanguageOption): void;
}
export interface CodeByteEditorProps {
  text: string;
  language: LanguageOption;
  hideCopyButton: boolean;
>>>>>>> 1ea415d740a542f5b784811283fdd5407d95eeb5
  onCopy?: CodebytesChangeHandler;
  isForums?: boolean;
  snippetsBaseUrl?: string;
  onEdit?: CodebytesChangeHandler;
  onLanguageChange?: CodebytesChangeHandler;
}
