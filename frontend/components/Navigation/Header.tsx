import { AUTHORS_NAME } from "@/constants/Shared";

export default function Header({children} : {
    children: React.ReactNode
}) {
    return (
        <header className="container mx-auto mt-5 px-2 flex flex-col md:flex-row gap-4 justify-between">
            <h1 className="text-xl">
                {AUTHORS_NAME}&apos;s Personal blog
            </h1>
            {children}
        </header>
    )
}