import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
    title: string;
    date: string;
    author: Author;
    tags?: string[];
};

export function PostHeader({ title, date, author, tags }: Props) {
    return (
        <>
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
