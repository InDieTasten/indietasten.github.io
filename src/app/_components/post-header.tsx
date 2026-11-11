import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type Props = {
    title: string;
    date: string;
    tags?: string[];
};

export function PostHeader({ title, date, tags }: Props) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            {tags && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="border border-teal-400 text-teal-300 bg-transparent px-2 py-0.5 rounded text-xs font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="mt-4 mb-10 text-sm text-zinc-500">
                <DateFormatter dateString={date} />
            </div>
        </>
    );
}
