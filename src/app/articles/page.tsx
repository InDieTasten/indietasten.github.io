import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { Article as ArticleType } from "@/interfaces/post";
import { getAllArticles } from "@/lib/api";
import { formatDate } from "@/lib/formatDate";

function Article({ article }: { article: ArticleType }) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/articles/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={article.date}
                    className="md:hidden"
                    decorate
                >
                    {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.excerpt}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
            </Card>
            <Card.Eyebrow
                as="time"
                dateTime={article.date}
                className="mt-1 max-md:hidden"
            >
                {formatDate(article.date)}
            </Card.Eyebrow>
        </article>
    )
}

export default function ArticlesIndex() {
    let articles = getAllArticles()

    return (
        <SimpleLayout
            title="Writing about Open Source, software design and useful tips and tricks around dev experience."
            intro="Collected in chronological order."
        >
            <div className="md:border-l md:pl-6 md:border-zinc-700/40">
                <div className="flex max-w-3xl flex-col space-y-16">
                    {articles.map((article) => (
                        <Article key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </SimpleLayout>
    )
}