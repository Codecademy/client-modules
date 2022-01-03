import type { languageOption } from './consts';

interface Response {
  stderr: string;
  stdout: string;
  exit_code: number;
}

interface PostSnippetData {
  language: languageOption;
  code: string;
}

export const postSnippet = async (
  data: PostSnippetData,
  snippetsBaseUrl?: string
): Promise<Response> => {
  const snippetsEndpoint = `https://${snippetsBaseUrl}/snippets`;

  const response = await fetch(snippetsEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'x-codecademy-user-id': 'codebytes-anon-user',
    },
  });
  return response.json();
};
