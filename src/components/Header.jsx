
import Logo from "../assets/images/Logo.png"

export default function Header () {
    return (
        <header>
        <img src={Logo} alt="logo" className="w-40 mx-auto mt-10"/>
            <nav>
                <ul className="flex justify-center gap-4 mt-4">
                    <li>
                        <a href="/" className=" hover:text-[#263A28] hover:font-bold">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about-us" className=" hover:text-[#263A28] hover:font-bold">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className=" hover:text-[#263A28] hover:font-bold">
                            Community
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}