import NavLink from "./NavLink"

export default function Navbar() {
    return (
        <nav>
            <ul className="flex gap-4 text-sm">
                <li>
                    <NavLink />
                </li>
                <li>
                    <NavLink />
                </li>
                <li>
                    <NavLink />
                </li>
            </ul>
        </nav>
    )
}