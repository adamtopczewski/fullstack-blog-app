import { AUTHORS_LAST_NAME } from "@/constants/Shared";
import { AUTHORS_FIRST_NAME } from "@/constants/Shared";

export default function Footer() {
  return (
    <footer className="w-full border-dashed border-y-2">
      <div className="container mx-auto flex justify-center items-center text-sm py-4">
        <p className="flex h-fit">
          <span className="text-base font-bold">© </span>
          {AUTHORS_FIRST_NAME + " " + AUTHORS_LAST_NAME}. All rights reversed.
        </p>
      </div>
    </footer>
  );
}
