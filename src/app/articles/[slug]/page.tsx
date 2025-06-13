import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles as getAllArticles, getPostBySlug as getArticleBySlug } from "@/lib/api";
import { SITE_TITLE } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Container } from "@/components/Container";

export default async function Article(props: Params) {
    const params = await props.params;
    const post = getArticleBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || "");

    return (
        <main>
            <Container>
                <article className="mb-32">
                    <PostHeader
                        title={post.title}
                        date={post.date}
                        author={post.author}
                        tags={post.tags}
                    />
                    <PostBody content={content} />
                </article>
            </Container>
        </main>
    );
}

type Params = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
    const params = await props.params;
    const article = getArticleBySlug(params.slug);

    if (!article) {
        return notFound();
    }

    const title = `${article.title} - ${SITE_TITLE}`;

    return {
        title,
        openGraph: {
            title,
            images: [article.ogImage?.url],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllArticles();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}
