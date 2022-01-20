import { languageOption } from './consts';

export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
  isIFrame?: boolean;
  snippetsBaseUrl?: string;
}
