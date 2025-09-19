import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import Link from "next/link";

type Props = {
    title: string;
    date: string;
    author: Author;
    tags?: string[];
};

export function PostHeader({ title, date, author, tags }: Props) {
    return (
        <>
            <div className="mb-4">
                <Link 
                    href="/articles"
                    className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                    <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Articles
                </Link>
            </div>
            <PostTitle>{title}</PostTitle>
            {tags && tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="hidden md:block md:mb-12">
                <Avatar name={author.name} picture={author.picture} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar name={author.name} picture={author.picture} />
                </div>
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    );
}
