import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const MobileNav = () => {
	
	const role = useSelector((state) => state.auth.role);
	
	return (
		<>
			<div className="w-full md:hidden flex items-center justify-between mt-4 gap-2">
				<Link to="/profile" className="text-zinc-100 font-semibold w-full text-center py-2 bg-zinc-800 hover:bg-zinc-900 rounded transition-all duration-300 shadow-md">
					Favourites
				</Link>
			  
				<Link to="/profile/orderHistory" className="text-zinc-100 font-semibold w-full text-center py-2 bg-zinc-800 hover:bg-zinc-900 rounded transition-all duration-300 shadow-md">
					Order History
				</Link>

				<Link to="/profile/settings" className="text-zinc-100 font-semibold w-full text-center py-2 bg-zinc-800 hover:bg-zinc-900 rounded transition-all duration-300 shadow-md">
					Settings
				</Link>
			</div>
		</>
	)
}

export default MobileNav