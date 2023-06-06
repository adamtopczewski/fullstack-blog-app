export default function Page({params} : {params : { slug : string }}) {
    return (
        <h1>
            Single article: {params.slug}
        </h1>
    )
}