import { IArticleCardProps } from "@/types/Shared/types";

export default function ArticleCard({title, createdAtDate, author, children }: IArticleCardProps) {
    return (
        <article className="flex flex-col border-dashed border-2 p-3 items-stretch h-full hover:border-yellow-400">
            <header>
                <div className="p-3 mb-2">
                    <h2 className="font-bold text-xl mb-2">{title}</h2>
                    <p className="text-sm font-thin">{createdAtDate.toLocaleDateString()}</p>
                    <p className="text-sm font-thin">{author}</p>
                </div>
            </header>
            <p className="my-2 px-2 line-clamp-3 md:line-clamp-2 lg:line-clamp-3">{children}</p>
        </article>
    )
}