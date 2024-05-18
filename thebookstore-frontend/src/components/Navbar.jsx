import { useEffect, useState } from "react";

// import icons from react icons
import { FaXmark, FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
//import Loginpage from "./Loginpage";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    //toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //nav items
    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Login", path: "/login" },
    ];

    return (
        <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
            <nav className={`py-4 lg:px-24 px-4 ${ isSticky ? "sticky top-0 left-0 right-0 bg-gray-400" : ""}`}>

                {/* nav items for large screen */}
                <div className="flex justify-between items-center text-base gap-8">

                    {/* bookstore logo */}
                    <Link to="/" className="text-3xl font-bold text-gray-800 flex items-center gap-2">THE BOOKSTORE</Link>

                    {/* nav items for large devices */}
                    <ul className="md:flex space-x-12 hidden navitems ">
                        {
                            navItems.map(({ link, path }) => 
                                <Link key={link} to={path}  className="link block text-base cursor-pointer uppercase text-black hover:text-gray-500">
                                    {link}
                                </Link>)
                        } 
                    </ul>

                    {/* menu btn for mobile screen */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                            {
                                isMenuOpen ? (<FaXmark className="h-6 w-6 text-gray-800" />) : (<FaBars className="h-5 w-5 text-gray-800" />)
                            }
                        </button>
                    </div>

                </div>

                {/* nav items for mobile screen */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-gray-800 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({ link, path }) => <a href={path} key={link} onClick={toggleMenu} className="block  text-gray-300 hover:text-gray-800"> {link} </a>)
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar