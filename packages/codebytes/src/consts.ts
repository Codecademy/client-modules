// key = language param to send to snippets service
// val = label in language selection drop down
export const languageOptions = {
    '': 'Select your language',
    cpp: 'C++',
    csharp: 'C#',
    golang: 'Go',
    javascript: 'JavaScript',
    php: 'PHP',
    python: 'Python 3',
    ruby: 'Ruby',
    scheme: 'Scheme',
  };
  
  export type languageOption = keyof typeof languageOptions;