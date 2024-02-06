import showdown from 'showdown'

export default async function markdownToHtml(markdown: string) {
  const converter = new showdown.Converter({simpleLineBreaks: true});
  const content = converter.makeHtml(markdown)
  return content;
}
