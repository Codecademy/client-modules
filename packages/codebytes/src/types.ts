import { languageOption } from './consts';

type CodebytesChangeHandler = (text: string, language: languageOption) => void;

export type CodebytesChangeHandlerMap = {
  logoClick?: () => void;
  edit?: CodebytesChangeHandler;
  languageChange?: CodebytesChangeHandler;
  copy?: CodebytesChangeHandler;
  run?: () => void;
};

export interface CodeByteEditorProps {
  text?: string;
  language?: languageOption;
  hideCopyButton?: boolean;
  isIFrame?: boolean;
  snippetsBaseUrl?: string /* TODO in DISC-353: Determine best way to host and include snippets endpoint for both staging and production in both the monolith and next.js repo. */;
  on?: CodebytesChangeHandlerMap;
}
