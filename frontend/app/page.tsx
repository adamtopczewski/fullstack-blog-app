import ArticleCard from "@/components/Shared/ArticleCard";
import mockArticlesData from '@/mockdata/articles.json';
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full h-full p-3 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-3 lg:gap-4 items-center w-full mb-6 md:mb-8 lg:mb-14">
          {mockArticlesData.map(articleData => {
            return (
              <ArticleCard
                key={articleData.id}
                title={articleData.title}
                author={articleData.author}
                createdAtDate={new Date(Date.parse(articleData.createdAt))} >
                  {articleData.summary}
                </ArticleCard>
            )
          })
          }
        </div>
        <Link className="w-100 text-center" href="/posts">Pokaż więcej</Link>
      </section>
    </>
  );
}
