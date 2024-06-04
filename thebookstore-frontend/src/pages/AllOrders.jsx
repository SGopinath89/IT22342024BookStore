import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";
import UserData from './UserData';

const AllOrders = () => {

	const [AllOrders, setAllOrders] = useState();
	const [userDiv, setuserDiv] = useState("hidden");
	const [userDivData, setuserDivData] = useState();

	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
	};

	useEffect(() => {
		const fetch = async () => {
			const response = await axios.get(
				"http://localhost:1000/api/v1/get-all-orders",
				{ headers }
			);
			setAllOrders(response.data.orders);
		};
		fetch();
	}, []);

	return (
		<>
			{!AllOrders && (
				<div className="h-[100%] flex items-center justify-center">
					{" "}
					<Loader/>{" "}
				</div>
			)}

			{AllOrders && AllOrders.length > 0 && (
				<div className="h-[100%] p-0 md:p-4 text-zinc-100">
					<h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
						Order History
					</h1>
		
					<div className="items-center justify-center mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
						<div className="w-[10%]">
							<h1 className="text-center">No.</h1>
						</div>

						<div className="w-[50%] md:w-[40%]">
							<h1>Title</h1>
						</div>

						<div className="w-0 md:w-[20%] hidden md:block">
							<h1>Category</h1>
						</div>

						<div className="w-[10%] md:w-[10%]">
							<h1>Price</h1>
						</div>

						<div className="w-[30%] md:w-[20%]">
							<h1 className="">
								<FaUserLarge/>
							</h1>
						</div>
					</div>
		
					{AllOrders && AllOrders.map((items, i) => (
						<div className="bg-zinc w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-point">
							<div className="w-[10%]">
								<h1 className="text-center">{i + 1}</h1>
							</div>

							<div className="w-[50%] md:w-[40%]">
								<Link to={`/view-book-details/${items.book._id}`} className="hover:text-zinc-400">
									{items.book.title}
								</Link>
							</div>

							<div className="w-0 md:w-[20%] hidden md:block">
								<h1>{items.book.category}</h1>
							</div>

							<div className="w-[10%] md:w-[10%]">
								<h1>${items.book.price}</h1>
							</div>

							<div className="w-[30%] md:w-[20%]">
								<button 
									className="text-xl hover:text-green-500" 
									onClick={() => {
										setuserDiv("fixed");
										setuserDivData(items.user);
									}}
								>
									<IoMdOpen/>
								</button>
							</div>
						</div>
					))}
					
			  	</div>
			)}

			{userDivData && (
				<UserData
					userDivData={userDivData}
					userDiv={userDiv}
					setuserDiv={setuserDiv}
				/>
			)}
		</>
	)
}

export default AllOrders
