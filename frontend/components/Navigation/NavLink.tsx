import Link from "next/link";

export default function NavLink({ to = "/", label = "Home" }) {
  return (
    <Link
      className="relative before:content-[''] before:animate-terminal before:hover:visible before:invisible before:absolute before:right-[110%] before:top-0 before:w-[0.5rem] before:h-full before:bg-white "
      href={to}
    >
      {label}
    </Link>
  );
}
