import { createHighlighter, Highlighter } from 'shiki';

let highlighter: Highlighter | null = null;

export async function highlight(code: string, lang: string): Promise<string> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark-dimmed'],
      langs: ['javascript', 'typescript', 'tsx', 'jsx', 'json', 'css', 'scss', 'html', 'bash'],
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: 'github-dark-dimmed',
  });
}
