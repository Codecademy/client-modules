import { languageOption } from './consts';
interface CodebytesChangeHandler {
  (text: string, language: languageOption): void;
}
export interface CodebytesChangeHandlerMap {
  logoClick?: () => void;
  edit?: CodebytesChangeHandler;
  languageChange?: CodebytesChangeHandler;
  copy?: CodebytesChangeHandler;
  run?: () => void;
}

export interface CodeByteEditorProps {
  text: string;
  language: languageOption;
  hideCopyButton: boolean;
  isIFrame?: boolean;
  snippetsBaseUrl?: string;
  on?: CodebytesChangeHandlerMap;
}
