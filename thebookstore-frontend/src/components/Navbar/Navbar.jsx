import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {

    // navigation links
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
		{
			title: "Admin",
			link: /profile
		}
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const role = useSelector((state) => state.auth.role);
    
    // Remove Cart, Profile, and Admin
	if (isLoggedIn === false) {
        links.splice(2,3);
    }
	
	// remove Admin
	if (isLoggedIn === true && role === "user") {
        links.splice(4,1);
    }

	// remove Profile
    if (isLoggedIn === true && role === "admin") {
        links.splice(3,1);
    }

    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            
            {/* Desktop navigation */}
            <nav className="flex relative z-50 bg-zinc-800 text-white md:px-20 px-10 py-5 items-center justify-between uppercase">
                
                {/* logo */}
                <Link to="/" className="flex items-center">
                    <h1 className="text-2xl font-semibold">THE BOOKSTORE</h1>
                </Link>

                {/* links */}
                <div className="nav-links block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((items, i) => (
                            <div className="flex items-center">
                                {items.title === "Profile" ||  items.title === "Admin" ? (
                                    <Link to={items.link} key={i} className="px-4 py-1 border border-zinc-900 rounded bg-zinc-900 hover:bg-white hover:text-zinc-900 transition-all duration-300">
                                        {items.title}
                                    </Link> 
									) : ( 
                                    <Link to={items.link} key={i} className="hover:text-zinc-900 transition-all duration-300">
                                        {items.title}{" "}
                                    </Link>
									)
                                }
                            </div>
                        ))}
                    </div>

                    {isLoggedIn === false && (
                        <div className="hidden md:flex gap-4">
                            <Link to="/LogIn" className="px-5 py-1 bg-zinc-900 text-white border border-zinc-900 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
                                LogIn
                            </Link>
                            <Link to="/SignUp" className="px-5 py-1 bg-zinc-900 text-white border border-zinc-900 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
                                SignUp
                            </Link>
                        </div>
                    )}

                    <button className="block md:hidden text-white text-2xl hover:text-zinc-400" onClick={() => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}>
                        <FaGripLines />
                    </button>
                </div>
                
            </nav>

            {/* Mobile navigation */}
            <div className={` ${MobileNav} absolute bg-zinc-800 h-screen top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link to={items.link} key={i} className={` ${MobileNav} text-white text-4xl font-semibold mb-8 hover:text-zinc-900 transition-all duration-300`} onClick={() => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}>
                        {items.title}{" "}
                    </Link>
                ))}

                {isLoggedIn === false && (
                    <>
                        <Link to="/LogIn" className={` ${MobileNav} px-8 py-2 mb-8 text-3xl border border-zinc-900 text-white rounded hover:bg-white hover:text-zinc-900 transition-all duration-300`}>
                            LogIn
                        </Link>
                        <Link to="/SignUp" className={` ${MobileNav} px-8 py-2 mb-8 text-3xl border border-zinc-900 text-white rounded hover:bg-white hover:text-zinc-900 transition-all duration-300`}>
                            SignUp
                        </Link>
                    </>
                )}
            </div>

        </>
    );
};

export default Navbar