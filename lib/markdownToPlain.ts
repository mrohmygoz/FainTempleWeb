import * as MarkdownIt from 'markdown-it';

export default async function markdownToPlain(markdown: string) {
  const md = new MarkdownIt();

  return md.renderInline(markdown).replace( /(<([^>]+)>)/ig, '')
}