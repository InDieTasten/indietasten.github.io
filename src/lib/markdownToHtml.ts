import { all } from '@wooorm/starry-night'
import rehypeStarryNight from 'rehype-starry-night'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export default async function markdownToHtml(markdown: string) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStarryNight, { grammars: all })
        .use(rehypeStringify)
        .process(markdown);
    return result.toString();
}
