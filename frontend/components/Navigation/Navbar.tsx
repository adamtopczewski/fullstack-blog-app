import NavLink from "./NavLink"

export default function Navbar() {
    return (
        <nav>
            <ul className="flex gap-6 text-sm">
                <li>
                    <NavLink />
                </li>
                <li>
                    <NavLink to="posts" label="Posty" />
                </li>
                <li>
                    <NavLink to="about" label="O mnie" />
                </li>
            </ul>
        </nav>
    )
}