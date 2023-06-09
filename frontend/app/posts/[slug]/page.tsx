export default function SingleArticle({params} : {params : { slug : string }}) {
    return (
        <h1>
            Single article: {params.slug}
        </h1>
    )
}