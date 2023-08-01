import { AUTHORS_FIRST_NAME } from "@/constants/Shared";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="min-h-fit">
      <div className="container mx-auto flex flex-col gap-4 align-center p-2">
        <h1 className="text-xl">
          <span className="text-yellow-300">
            @{AUTHORS_FIRST_NAME.toLowerCase()}
          </span>
          &apos;s Personal blog
        </h1>
        {children}
      </div>
    </header>
  );
}
