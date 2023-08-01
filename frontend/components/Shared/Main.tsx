export default function Main({children} : {children: React.ReactNode}) {
    return (
    <main className="container mx-auto px-2 pb-5 flex flex-1 flex-col items-center">
        {children}
    </main>
    )
}