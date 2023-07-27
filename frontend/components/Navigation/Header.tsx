import { AUTHORS_NAME } from "@/constants/Shared";

export default function Header({children} : {
    children: React.ReactNode
}) {
    return (
        <header className="container mx-auto flex flex-col gap-4 align-center mt-5 px-2">
            <h1 className="text-xl">
                {AUTHORS_NAME}&apos;s Personal blog
            </h1>
            {children}
        </header>
    )
}